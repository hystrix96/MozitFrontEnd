import React , { useRef, useState, useEffect, useCallback  }from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AppTheme from '../shared-theme/AppTheme';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { Link } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';



export default function MozaicPage() {
  const location = useLocation();
  const savedFileName = 'mozit.mp4'; // 전달된 savedFileName 받기
  const videoUrl = savedFileName ? `http://localhost:8080/edit/videos/${savedFileName}` : null;

  // 캔버스와 비디오 참조
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [value, setValue] = useState(0); // 탭 상태 추가
  const [detectionData, setDetectionData] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [sliderValue, setSliderValue] = useState(0); // 슬라이더 값을 상태로 관리
  const [faceIds, setFaceIds] = useState([]);
  
// ✅ Face ID
////////////////////////////////////////////////////

const getUniqueFaceIds = (detections) => {
  const faceIds = detections
    .flatMap(d => d.detections) // 모든 프레임의 detections을 평탄화
    .filter(detection => detection.className === "face")
    .map(detection => detection.objectId);
  
  console.log("Filtered Face IDs:", faceIds); // 로그 추가
  
  return [...new Set(faceIds)]; // 중복 제거
}

useEffect(() => {
  console.log("Detection Data:", detectionData);
  if (detectionData.length > 0) {
    const uniqueFaceIds = getUniqueFaceIds(detectionData);
    console.log("Unique Face IDs:", uniqueFaceIds); 
    setFaceIds(uniqueFaceIds);
  }
}, [detectionData]);
////////////////////////////////////////////////////////////


  
  // 각 탭별 상태 저장
  const [settings, setSettings] = useState({
    mosaic: false,
    blur: true,
    intensity: 50,
    size: 50, // 모자이크 크기
    person: {
        checkedPeople: [], // 초기값을 빈 배열로 설정
    },
});

useEffect(() => {
  // 초기 설정
  setSettings({
    mosaic: false,
    blur: true,
    intensity: 50,
    size: 50,
    person: {
        checkedPeople: [], // 체크된 사람들을 저장할 배열
    },
  });
}, []);



   // ✅ 모자이크 또는 블러 중 하나만 선택 가능하게 함
   const handleCheckboxChange = (effectType, event) => {
    setSettings(prevSettings => {
      const updatedSettings = { ...prevSettings };

      if (effectType === "mosaic") {
        updatedSettings.mosaic = true;
        updatedSettings.blur = false;
      } else if (effectType === "blur") {
        updatedSettings.blur = true;
        updatedSettings.mosaic = false;
      }

      return updatedSettings;
    });
  };
  

  // 슬라이더 핸들러=> 이게 모자이크 
  const handleSliderChange2 = (tab, key) => (event, newValue) => {
    setSettings((prev) => ({
      ...prev,
      [tab]: { ...prev[tab], [key]: newValue },
    }));
  };

  // 사람 체크박스 핸들러 (사람 탭 전용)
  const handlePersonCheck = (personId) => (event) => {
    setSettings((prev) => ({
      ...prev,
      person: {
        ...prev.person,
        checkedPeople: event.target.checked
          ? [...prev.person.checkedPeople, personId]
          : prev.person.checkedPeople.filter((p) => p !== personId),
      },
    }));
  };
  


  const handleTabChange2 = (_, newValue) => setValue(newValue);

  /* */

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setCanvasSize({
        width: video.videoWidth,
        height: video.videoHeight,
      });
      setVideoDuration(video.duration); // 비디오 길이 설정
    }
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.error("Error playing the video:", error);
        });
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };



//이게 재생바 
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue); // 슬라이더 값 업데이트
    const video = videoRef.current;
    video.currentTime = (newValue / 100) * videoDuration; // 슬라이더 값에 비례하여 현재 재생 시간 조정
  };



  const handleCanvasClick = () => {
  const video = videoRef.current;
  if (video) {
    if (video.paused) {
      handlePlayPause(); // 재생
    } else {
      handlePlayPause(); // 일시 정지
    }
  }
};

/*
   재생바
          */
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const updateSlider = () => {
        const currentSliderValue = (video.currentTime / videoDuration) * 100; // 비디오 현재 시간 비율
        setSliderValue(currentSliderValue); // 슬라이더 값 업데이트
      };
      
      video.addEventListener('timeupdate', updateSlider);
      return () => {
        video.removeEventListener('timeupdate', updateSlider);
      };
    }
  }, [videoDuration]);

  // 캔버스에 투명한 색을 그리는 함수
  const drawTransparentOverlay = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // 캔버스 사이즈 설정
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    // 투명한 색 사각형 그리기
    context.fillStyle = 'rgba(255, 255, 255, 0)'; // 반투명 빨간색
    context.fillRect(0, 0, canvas.width, canvas.height);
  };


  // ✅ 모자이크 & 블러를 적용하는 함수
  const drawMosaicOrBlur = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
  
    if (!video || !ctx || canvasSize.width === 0 || canvasSize.height === 0) return;
  
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
    const currentFrame = Math.floor(video.currentTime * 30); // 현재 프레임 계산
    const currentDetections = detectionData.find(d => d.frame === currentFrame)?.detections || []; // 현재 프레임의 detections 가져오기
  
    currentDetections.forEach(({ x, y, width, height, objectId, className }) => {
      const maskSize = settings.size;
      const newWidth = width * (maskSize / 50);
      const newHeight = height * (maskSize / 50);
  
      // className이 "face"인 경우에만 체크된 objectId에 따라 모자이크 적용
      if (className === "face") {
        if (settings.person.checkedPeople.includes(objectId)) {
          // 체크된 사람에 대해서만 모자이크 적용
          if (settings.mosaic) {
            applyMosaic(ctx, x, y, newWidth, newHeight, maskSize, settings.intensity);
          } else if (settings.blur) {
            applyBlur(ctx, x, y, newWidth, newHeight, maskSize, settings.intensity);
          }
        }
      } else {
        // className이 "face"가 아닌 경우 무조건 모자이크 적용
        if (settings.mosaic) {
          applyMosaic(ctx, x, y, newWidth, newHeight, maskSize, settings.intensity);
        } else if (settings.blur) {
          applyBlur(ctx, x, y, newWidth, newHeight, maskSize, settings.intensity);
        }
      }
  
      // ctx.strokeStyle = "black";
      // ctx.lineWidth = 4;
      // ctx.strokeRect(x, y, newWidth, newHeight);
    });
  };
  
  
  
  
  


  /*
     블러처리
             */

 // ✅ 모자이크 & 블러 처리 함수
  const applyEffect = (ctx, x, y, width, height, effectType) => {
    if (effectType === "mosaic") {
      applyMosaic(ctx, x, y, width, height);
    } else if (effectType === "blur") {
      applyBlur(ctx, x, y, width, height);
    }
  };
  
  // ✅ 블러 처리 함수 추가
  const applyMosaic = (ctx, x, y, width, height, size, intensity) => {
    const blockSize = Math.max(size / 4, 4) * (intensity / 100); // 모자이크 블록 크기를 절반으로 줄임 (최소 5 유지)
    
    for (let i = x; i < x + width; i += blockSize) {
      for (let j = y; j < y + height; j += blockSize) {
        const pixel = ctx.getImageData(i, j, blockSize, blockSize);
        const avgColor = getAverageColor(pixel.data);
        
        ctx.fillStyle = `rgb(${avgColor.r}, ${avgColor.g}, ${avgColor.b})`;
        ctx.fillRect(i, j, blockSize, blockSize);
      }
    }
  
    // 📌 테두리를 모자이크 크기에 맞게 조정
    ctx.strokeStyle = "black";
    ctx.lineWidth = Math.max(blockSize / 4, 5); // 기존 대비 줄어든 크기 반영
    ctx.strokeRect(x, y, width, height);
  };
  
  
  const applyBlur = (ctx, x, y, width, height, blurSize, intensity) => {
    ctx.save();

    // 슬라이더 값에 따라 블러의 강도를 조정
    const blurAmount = (blurSize * intensity) / 100; 

    // 블러를 적용할 영역의 필터 설정
    ctx.filter = `blur(${blurAmount}px)`; 
    ctx.drawImage(canvasRef.current, x, y, width, height, x, y, width, height); // 블러가 적용된 이미지를 그립니다.

    ctx.restore();
};


  
  // 평균 색상을 구하는 함수
  const getAverageColor = useCallback((pixelData) => {
    let r = 0, g = 0, b = 0;
    const pixelCount = pixelData.length / 4;
  
    for (let i = 0; i < pixelData.length; i += 4) {
      r += pixelData[i];
      g += pixelData[i + 1];
      b += pixelData[i + 2];
    }
  
    return {
      r: Math.floor(r / pixelCount),
      g: Math.floor(g / pixelCount),
      b: Math.floor(b / pixelCount),
    };
  }, []);
  
  useEffect(() => {
    const fetchDetections = async () => {
      try {
        const response = await fetch(`http://localhost:8080/edit/videos/${savedFileName}/info`);
        const data = await response.json();
        
        // 각 프레임의 detections을 포함한 객체를 유지하면서 평탄화
        const flattenedDetections = data.detections.map(item => ({
          frame: item.frame,
          detections: item.detections // 원래 detections 배열 유지
        }));
  
        setDetectionData(flattenedDetections);
      } catch (error) {
        console.error("Error fetching detection data:", error);
      }
    };
  
    fetchDetections();
  }, [savedFileName]);
  
  


 // 비디오 재생 시 모자이크 또는 블러 적용
 useEffect(() => {
  const video = videoRef.current;
  let animationFrameId;

  const render = () => {
    if (video.paused || video.ended) return;
    drawMosaicOrBlur(); // 비디오 프레임을 그리는 함수 호출
    animationFrameId = requestAnimationFrame(render);
  };

  video.addEventListener("play", render);

  return () => {
    video.removeEventListener("play", render);
    cancelAnimationFrame(animationFrameId);
  };
}, [canvasSize, detectionData, settings]);

  
  

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppTheme sx={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <CssBaseline />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <Box sx={{ display: 'flex', height: '100%', padding: 2 }}>
        <Box sx={{ width: '75%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              marginTop: 4,
              color: 'text.primary',
            }}
          >
            모자이크 처리된 동영상
          </Typography>
          {videoUrl ? (
            <>
              <video
                ref={videoRef}
                src={videoUrl}
                crossOrigin="anonymous"
                // controls
                onLoadedMetadata={handleLoadedMetadata}
                style={{
                  display: 'block',
                  width: '80%', // 비디오 너비를 80%로 설정
                  height: 'auto', // 비율 유지
                  position: 'relative', // 위치 설정
                  top: 0, // 상단 정렬
                  zIndex: 1, // 비디오가 위에 오도록 설정
                  marginBottom: '50px',
                }}
              />
              <canvas
                ref={canvasRef}
                width={canvasSize.width}
                height={canvasSize.height}
                onClick={handleCanvasClick}
                style={{
                  position: 'absolute', // 절대 위치로 설정
                  top: 0,
                  pointerEvents: 'auto', // 캔버스가 클릭 이벤트를 차단하지 않도록
                  zIndex: 2, // 캔버스가 비디오 위에 오도록 설정
                  width: '80%', // 캔버스 너비를 비디오와 동일하게 설정
                  height: 'auto', // 자동으로 높이 조정
                  top: '68px',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  zIndex: 3,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
                  borderRadius: '5px',
                  padding: '10px',
                }}
              >
                <Button onClick={handlePlayPause}>
                  {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </Button>
                <Slider
                  id="video-slider"
                  sx={{ marginLeft: '10px', flexGrow: 1 }}
                  value={sliderValue} 
                  onChange={handleSliderChange}
                />
              </Box>
            </>
          ) : (
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                color: 'error.main',
                marginTop: 2,
              }}
            >
              처리된 동영상이 없습니다.
            </Typography>
          )}
        </Box>

        <Box sx={{ width: "25%", padding: 2 }}>
        <Tabs value={value} onChange={handleTabChange2} sx={{ marginBottom: 2 }}>
          <Tab label="유해요소" />
          <Tab label="개인정보" />
          <Tab label="사람" />
        </Tabs>

        {/* 공통 UI */}
        {["harmful", "privacy", "person"].map((tab, index) =>
          value === index && (
            <Box key={tab}>
              <Typography variant="h6">마스크 설정</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={settings.mosaic}
                    onChange={(e) => handleCheckboxChange("mosaic", e)}
                  />
                }
                label="모자이크"
              />
              <FormControlLabel
                control={<Checkbox checked={settings.blur} onChange={(e) => handleCheckboxChange("blur", e)} />}
                label="블러"
              />
              <Typography variant="h6">마스크 강도</Typography>
              <Slider value={settings.intensity} onChange={(e, newValue) => setSettings(prev => ({ ...prev, intensity: newValue }))} />
              <Typography variant="h6">마스크 크기</Typography>
              <Slider
                value={settings.size}
                onChange={(e, newValue) => setSettings(prev => ({ ...prev, size: newValue }))}
                min={1} // 최소 크기
                max={100} // 최대 크기
                step={1}
                valueLabelDisplay="auto"
              />

              {/* 사람 탭에서만 마스크 체크 표시 */}
              {tab === "person" && (
                <>
                  <Typography variant="h6">마스크 체크</Typography>
                  {faceIds.map((id) => (
                    <FormControlLabel
                      key={id}
                      control={
                        <Checkbox
                          checked={settings.person?.checkedPeople?.includes(id) || false}
                          onChange={handlePersonCheck(id)}
                        />
                      }
                      label={`사람 ${id}`} // 또는 다른 적절한 라벨
                    />
                  ))}
                </>
              )}
            </Box>
          )
        )}
        </Box>
      </Box>

      <Stack direction="row" spacing={2} sx={{ marginTop: 2, justifyContent: 'center' }}>
        <Button variant="contained" color="primary" component={Link} to="/edit">
          돌아가기
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => {/* 다른 동작 */}} component={Link} to="/download">
          편집완료
        </Button>
      </Stack>
    </AppTheme>
  );
}