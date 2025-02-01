import React, { useRef, useState, useEffect, useCallback } from 'react';
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
import { imageDataRGB } from 'stackblur-canvas';

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

  const [faceImages, setFaceImages] = useState({}); // 각 faceId에 해당하는 이미지를 저장할 상태
  // ✅ Face ID
  const getUniqueFaceIds = (detections) => {
    const faceIds = detections
      .flatMap(d => d.detections) // 모든 프레임의 detections을 평탄화
      .filter(detection => detection.className === "face")
      .map(detection => detection.objectId);

    console.log("Filtered Face IDs:", faceIds); // 로그 추가
    return [...new Set(faceIds)]; // 중복 제거
  };


  // 컴포넌트 마운트 시 로컬 스토리지에서 데이터 불러오기
useEffect(() => {
  const savedFaceImages = JSON.parse(localStorage.getItem('faceImages')) || {};
  setFaceImages(savedFaceImages);
}, []);

// faceImages 상태가 변경될 때마다 로컬 스토리지에 저장
useEffect(() => {
  localStorage.setItem('faceImages', JSON.stringify(faceImages));
}, [faceImages]);

  useEffect(() => {
    console.log("Detection Data:", detectionData);
    if (detectionData.length > 0) {
      const uniqueFaceIds = getUniqueFaceIds(detectionData);
      console.log("Unique Face IDs:", uniqueFaceIds);
      setFaceIds(uniqueFaceIds);
    }
  }, [detectionData]);

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
      size: 70,
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

  // 이게 재생바
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

  // 재생바
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

  // 캔버스에 비디오 프레임을 그립니다.
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const currentFrame = Math.floor(video.currentTime * 30); // 현재 프레임 계산
  const currentDetections = detectionData.find(d => d.frame === currentFrame)?.detections || []; // 현재 프레임의 detections 가져오기

  currentDetections.forEach(({ x, y, width, height, objectId, className }) => {
    const maskSize = settings.size;
    const newWidth = width * (maskSize / 50);
    const newHeight = height * (maskSize / 50);

     // ✅ 빨간 글씨로 objectId와 className 출력
    ctx.fillStyle = "red"; 
    ctx.font = "bold 14px Arial"; 
    ctx.fillText(`ID: ${objectId}`, x+width+5, y+10 ); // 박스 위쪽에 ID 표시
    ctx.fillText(`Class: ${className}`, x+width+5, y+30 ); // 박스 아래쪽에 className 표시
     // 박스 색상 조건부 설정
      ctx.strokeStyle = "red"

      // 박스 그리기
      ctx.lineWidth = 2; // 박스 두께
      ctx.strokeRect(x, y, width, height); // 박스 그리기
    // 모든 객체에 대해 박스를 그립니다.
    if (className === "face") {
      // 체크된 사람에 대해서만 모자이크 또는 블러 적용
      if (settings.person.checkedPeople.includes(objectId)) {
        if (settings.mosaic) {
          applyMosaic(ctx, x, y, newWidth, newHeight, maskSize, settings.intensity);
        } else if (settings.blur) {
          applyBlur(ctx, x, y, newWidth, newHeight, maskSize, settings.intensity);
        }
      }
    } else {
      // 다른 객체(예: 유해요소, 개인정보)에 대해서는 기존 로직 유지
      if (settings.mosaic) {
        applyMosaic(ctx, x, y, newWidth, newHeight, maskSize, settings.intensity);
      } else if (settings.blur) {
        applyBlur(ctx, x, y, newWidth, newHeight, maskSize, settings.intensity);
      }
    }
  });

};

  // ✅ 모자이크 처리 함수 추가
  const applyMosaic = (ctx, x, y, width, height, size, intensity) => {
    const blockSize = Math.max(size / 4, 4) * (intensity / 100); // 모자이크 블록 크기 조정

    // ✅ 중심 좌표에서 크기 조정
    x = x + width / 3;
    y = y + height / 4;
    const startX = x - width / 2;
    const startY = y - height / 2;
    const endX = x + width / 2;
    const endY = y + height / 2;

    for (let i = startX; i < endX; i += blockSize) {
      for (let j = startY; j < endY; j += blockSize) {
        const pixel = ctx.getImageData(i, j, blockSize, blockSize);
        const avgColor = getAverageColor(pixel.data);

        ctx.fillStyle = `rgb(${avgColor.r}, ${avgColor.g}, ${avgColor.b})`;
        ctx.fillRect(i, j, blockSize, blockSize);
      }
    }

    // 📌 테두리를 모자이크 크기에 맞게 조정
    // ctx.strokeStyle = "black";
    // ctx.lineWidth = Math.max(blockSize / 4, 5);
    // ctx.strokeRect(startX, startY, width, height);
  };

  // ✅ 블러 처리 함수 추가
const applyBlur = (ctx, x, y, width, height, blurSize, intensity) => {
  const canvas = canvasRef.current;
  
  // 블러 강도 조정
  const blurAmount = Math.round((blurSize * intensity) / 100);

  // 캔버스에서 지정한 영역만 잘라내기
  const imageData = ctx.getImageData(x, y, width, height);

  // StackBlur로 블러 적용 (이미지 데이터를 확대하여 처리)
  imageDataRGB(imageData, 0, 0, width, height, blurAmount);

  // 변경된 imageData를 다시 캔버스에 그리기
  ctx.putImageData(imageData, x, y);

  // 캔버스를 리렌더링하여 블러 영역이 제대로 적용되도록 함
  ctx.drawImage(canvas, 0, 0);  // 필요에 따라 전체 캔버스를 갱신
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

      // 비디오가 로딩된 후에 이미지 캡쳐를 시작
      const video = videoRef.current;
      if (video) {
        const handleVideoReady = async () => {
          const faceImagesMap = {};
          for (const { detections } of flattenedDetections) {
            for (const { objectId, className, x, y, width, height } of detections) {
              if (className === "face" && !faceImagesMap[objectId]) {
                // 특정 프레임의 이미지 캡쳐
                const frameTime = (video.duration / flattenedDetections.length) * flattenedDetections.findIndex(d => d.detections === detections);
                const canvas = await captureFrame(video, frameTime);
                const imageUrl = captureImageFromFrame(canvas, x, y, width, height);
                faceImagesMap[objectId] = imageUrl;
                console.log(`Saved image for faceId: ${objectId}`, imageUrl); // 로그 추가
              }
            }
          }

          setFaceImages(faceImagesMap); // faceImages 상태 업데이트
          console.log("Face Images Map:", faceImagesMap); // 로그 추가
        };

        video.addEventListener('loadedmetadata', handleVideoReady);
        return () => {
          video.removeEventListener('loadedmetadata', handleVideoReady);
        };
      }
    } catch (error) {
      console.error("Error fetching detection data:", error);
    }
  };

  fetchDetections();
}, [savedFileName]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  // ✅ Canva에서 특정 영역 캡처하는 함수
 const captureFrame = (video, frameTime) => {
  return new Promise((resolve) => {
    video.currentTime = frameTime; // 특정 프레임으로 이동
    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      resolve(canvas); // 캔버스 반환
    };
  });
};


  // ✅ 탐지된 얼굴 영역 캡처 및 이미지 표시
const getFaceImage = (id) => {
  return faceImages[id] || null; // faceImages에서 이미지를 가져옴
};

  const captureImageFromFrame = (canvas, x, y, width, height) => {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = width;
  tempCanvas.height = height;
  const tempContext = tempCanvas.getContext('2d');
  tempContext.drawImage(
    canvas,
    x, y, width, height, // 원본 이미지에서 잘라낼 영역
    0, 0, width, height  // 새로운 캔버스에 그릴 영역
  );
  return tempCanvas.toDataURL(); // Data URL로 변환
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
          <Tabs value={value} onChange={handleTabChange2} sx={{ marginBottom: 2 }} >
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
                <Slider value={settings.intensity - 70} onChange={(e, newValue) => setSettings(prev => ({ ...prev, intensity: newValue + 70 }))} min={1} // 최소 크기
                  max={10} // 최대 크기
                  step={1}
                  valueLabelDisplay="auto" />
                <Typography variant="h6">마스크 크기</Typography>
                <Slider
                  value={settings.size - 70}
                  onChange={(e, newValue) => setSettings(prev => ({ ...prev, size: newValue + 70 }))}
                  min={1} // 최소 크기
                  max={10} // 최대 크기
                  step={1}
                  valueLabelDisplay="auto"
                />

                {/* 사람 탭에서만 마스크 체크 표시 */}
                {tab === "person" && (
                  <>
                    <Typography variant="h6">마스크 체크</Typography>
                    {faceIds.map((id) => {
                      // 탐지된 얼굴 영역 캡처
                      const imageUrl = getFaceImage(id);

                      return (
                        <FormControlLabel
                          key={id}
                          control={
                            <Checkbox
                              checked={settings.person?.checkedPeople?.includes(id) || false}
                              onChange={handlePersonCheck(id)}
                            />
                          }
                          label={
                            imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={`사람 ${id}`}
                                style={{ width: '50px', height: '50px' }}
                              />
                            ) : (
                              `사람 ${id}`
                            )
                          }
                        />
                      );
                    })}
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