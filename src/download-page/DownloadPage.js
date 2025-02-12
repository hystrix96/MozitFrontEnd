import * as React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Popover from '@mui/material/Popover'; // Popover 추가
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import SitemarkIcon from '../components/SitemarkIcon';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';

//비디오 테두리 스타일
const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '60%',
  height: '60vh',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: '6px solid',
  outlineColor: 'hsla(220, 25%, 80%, 0.2)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  backgroundSize: 'cover',
  overflow: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: '70vh',
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
    outlineColor: 'hsla(220, 20%, 42%, 0.1)',
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));


const ControlBox = styled(Box)(({ showControls }) => ({
  position: 'absolute',
  bottom: '5px',
  left: '20px',
  right: '20px',
  display: 'flex',
  alignItems: 'center',
  zIndex: 3,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
  borderRadius: '5px',
  opacity: showControls ? 1 : 0, // 마우스 오버 시만 보이게 설정
  transition: 'opacity 0.3s ease', // 부드러운 전환
}));


export default function DownloadPage(props) {
  const [videoSrc, setVideoSrc] = useState(null);
  const [loading, setLoading] = useState(false); // 영상 처리 중 상태 추가
  const editButtonRef = useRef(null); // 편집 시작 버튼 참조 추가
  const videoRef = useRef(null); // 비디오 참조 추가
  const canvasRef = useRef(null); // 캔버스 참조 추가
  const navigate = useNavigate(); // useNavigate를 호출하여 navigate 함수 정의
  const { accessToken } = useAuth();
  const location = useLocation();
  const { settings , editNum, fps, uploadedVideoUrl,detection_data, title } = location.state || {}; // 전달된 마스크 상태 가져오기
  const savedFileName=uploadedVideoUrl;
  const videoUrl = uploadedVideoUrl;
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0); 
  const [sliderValue, setSliderValue] = useState(0); // 슬라이더 값을 상태로 관리
  const [showControls, setShowControls] = useState(false); // 컨트롤 표시 상태
  const [detectionData, setDetectionData] = useState([]);
 
 






/////////비디오 화면에 마우스 올라가면 재생바 나타남//////////////
  const handleMouseEnter = () => {
    setShowControls(true); // 마우스가 올라가면 컨트롤 표시
  };
  
  const handleMouseLeave = () => {
    setShowControls(false); // 마우스가 나가면 컨트롤 숨김
  };
////////////////////////////////////////////////////////////






////////////////////비디오 컨트롤///////////////////////
  // 비디오 로드 후 캔버스 크기 설정
  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // 비디오 메타데이터가 로드된 후 캔버스 크기 조정
      video.addEventListener('loadedmetadata', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // 초기 비디오 그리기
      });
    }
  }, [videoSrc]); // videoSrc가 변경될 때마다 실행

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
////////////////////////////////////////////////////////////



 //비디오 끝까지 재생되면 일시정지 
  useEffect(() => {
  const video = videoRef.current;
  if (video) {
    const handleVideoEnd = () => {
      setIsPlaying(false); // 비디오가 끝나면 재생 상태를 false로 설정
    };

    video.addEventListener('ended', handleVideoEnd); // ended 이벤트 리스너 추가

    return () => {
      video.removeEventListener('ended', handleVideoEnd); // 컴포넌트 언마운트 시 리스너 제거
    };
  }
}, []);



  const handlePlayPause = () => {
    const video = videoRef.current;
  if (video) {
    if (video.ended) {
      video.currentTime = 0; // 비디오가 끝났다면 처음으로 이동
    }
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

  //재생 슬라이드 바 
  const handleSliderChange = (event, newValue) => {
  setSliderValue(newValue); // 슬라이더 값 업데이트
    const video = videoRef.current;
    if (video) {
    video.currentTime = (newValue / 100) * videoDuration; // 슬라이더 값에 비례하여 현재 재생 시간 조정

    // 슬라이더가 끝에 도달하면 재생 상태를 false로 설정
    if (newValue >= 100) {
      setIsPlaying(false);
    }
  }
  };
  //캔버스 클릭시 재생및 일시정지
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


  // 비디오 시간 업데이트 시 슬라이더 값 갱신
useEffect(() => {
  const video = videoRef.current;

  const updateSliderValue = () => {
    if (video) {
      const currentTime = video.currentTime;
      const newValue = (currentTime / videoDuration) * 100; // 비디오 길이에 비례하여 슬라이더 값 계산
      setSliderValue(newValue);
    }
  };

  video.addEventListener('timeupdate', updateSliderValue);

  return () => {
    video.removeEventListener('timeupdate', updateSliderValue);
  };
}, [videoDuration]);

///////////////////////////////////////////////////////////////////









///////////////////모자이크 처리/////////////////////////////////
//모자이크 처리할 json정보 요청
  useEffect(() => {
    const fetchDetections = async () => {
      try {
      const flattenedDetections = detection_data.frames.map(frame => ({
        frame: frame.frame,
        detections: frame.detections, // 각 프레임의 탐지된 객체 목록
      }));
  
        setDetectionData(flattenedDetections);
      } catch (error) {
        console.error("Error fetching detection data:", error);
      }
    };
  
    fetchDetections();
  }, [savedFileName]);

    // 모자이크 처리 함수 수정
    const drawMosaicOrBlur = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
    
      if (!video || !ctx || canvasSize.width === 0 || canvasSize.height === 0) return;
    
      canvas.width = canvasSize.width;
      canvas.height = canvasSize.height;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
      const currentFrame = Math.floor(video.currentTime * fps); // 현재 프레임 계산
      const currentDetections = detectionData.find(d => d.frame === currentFrame)?.detections || []; // 현재 프레임의 detections 가져오기
    
      const { person } = settings || {};
      const { intensity: personIntensity = 50, size: personSize = 50, checkedPeople = [] } = person || {};
      const { harmfulElements } = settings || {};
      const { intensity: harmfulIntensity = 50, size: harmfulSize = 50 } = harmfulElements || {};
      const { checkedItems = [] } = harmfulElements || {};
      const { personalInfo } = settings || {}; // 개인정보 설정 추가
      const { intensity: privacyIntensity = 50, size: privacySize = 50, checkedItems: privacyElements= [] } = personalInfo || {};

      currentDetections.forEach(({ x, y, width, height, objectId, className }) => {
        const maskSize = personSize; // 사람 관련 크기 설정
        const newWidth = width * (maskSize / 50);
        const newHeight = height * (maskSize / 50);
    
        if (className === "face") {
          // 얼굴인 경우, checkedPeople에 포함된 objectId에 대해서만 모자이크 적용
          if (checkedPeople.includes(objectId)) {
            applyMosaic(ctx, x, y, newWidth, newHeight, maskSize, personIntensity); // 사람 강도 사용
          }
        }// 유해 요소 처리 
        else if (checkedItems.includes(className)) {
          applyMosaic(ctx, x, y, newWidth, newHeight, harmfulSize, harmfulIntensity); // 유해 요소 강도 사용
        } 
        // 개인정보 처리
        else if (privacyElements.includes(className)) {
          applyMosaic(ctx, x, y, newWidth, newHeight, privacySize, privacyIntensity); // 개인정보 강도 사용
        }
      });
    };
    
    

    
    
  // ✅ 모자이크 & 블러 처리 함수
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

///////////////////////////////////////////////////////////////////













///////////////////    재편집   ///////////////////////////
const handleReEdit = async () => {
  try {
    const response = await fetch('https://mozit-spring-leo8071004-e7b9gwh9cuayc2gf.koreacentral-01.azurewebsites.net/edit/restart-editing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // JSON 형식으로 설정
        'Authorization': accessToken,
      },
      body: JSON.stringify({
        videoFileName: savedFileName, // 비디오 파일 이름 전달
      }), // JSON으로 변환하여 전송
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const editNum = await response.json(); // EDIT_NUM 반환

    // MosaicPage로 이동
    navigate('/mozaic', { state: { editNum, uploadedVideoUrl,detection_data } });
  } catch (error) {
    console.error('Error during re-editing:', error);
  }
};
///////////////////////////////////////////////////////////////////


const handleDownload = async () => {
  setLoading(true);
  const { person } = settings || {};
  const { intensity: personIntensity = 50, size: personSize = 50, checkedPeople = [] } = person || {};
  const { harmfulElements } = settings || {};
  const { intensity: harmfulIntensity = 50, size: harmfulSize = 50 ,checkedItems:harmfulCheckedItems=[]} = harmfulElements || {};
  const { personalInfo } = settings || {}; // 개인정보 설정 추가
  const { intensity: privacyIntensity = 50, size: privacySize = 50, checkedItems:personalCheckedItems=[] } = personalInfo || {};
  const faceMosaic = person?.checkedPeople?.length > 0; // 체크된 사람의 수에 따라 true/false 설정

  //다운로드 요청 본문 구성
  const downloadInfo = {
    editNum: {
        editNum: Number(editNum) // Edits 객체 내에 있는 editNum
    },
    faceMosaic: faceMosaic, // 얼굴 모자이크 여부
    hazardousList: Array.isArray(harmfulCheckedItems) ? harmfulCheckedItems.join(",") : '', // 유해 요소 목록
    personalList: Array.isArray(personalCheckedItems) ? personalCheckedItems.join(",") : '', // 개인정보 목록
};

// savedFileName에서 파일 이름만 추출
const fileName = savedFileName.split('/').pop().split('?')[0]; // Windows 경로에서 파일 이름 추출
const outputPath = fileName; // 최종 경로 설정


const payload = {
  request: {
      harmful_intensity: harmfulIntensity,
      harmful_size: harmfulSize,
      harmful_checklist: Array.isArray(harmfulCheckedItems) ? harmfulCheckedItems.join(", ") : "", // 문자열로 변환
      privacy_intensity: privacyIntensity,
      privacy_size: privacySize,
      privacy_checklist: Array.isArray(personalCheckedItems) ? personalCheckedItems.join(", ") : "", // 문자열로 변환
      person_intensity: personIntensity,
      person_size: personSize,
      person_checklist: Array.isArray(checkedPeople) ? checkedPeople.join(", ") : "", // 문자열로 변환
  },
  path_request: {
      video_path: savedFileName,  // 실제 경로로 수정
      output_path: outputPath,     // 실제 경로로 수정 이거 바꿔야 함 배포 !!
      video_title: title,
  }
};
try {
  // 첫 번째 요청: input_editor로 payload 전송
  const response = await fetch('https://mozit-fastapi-leo8071004-due6hwdzguebceh7.koreacentral-01.azurewebsites.net/input_editor', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
  });

  if (!response.ok) {
      const errorResponse = await response.text(); // 텍스트로 응답 받기
      throw new Error(`Network response was not ok for input_editor: ${errorResponse}`);
  }

  const result = await response.json();

      // 비디오 경로를 받아서 다운로드 트리거
      const videoPath = result; // 서버에서 비디오 경로 가져오기
      if (videoPath) {
      const a = document.createElement('a'); // 링크 요소 생성
      a.href = videoPath; // 비디오 경로 설정
      a.download = videoPath.split('/').pop(); // 다운로드할 파일 이름 설정
      document.body.appendChild(a); // DOM에 추가
      a.click(); // 클릭 이벤트 트리거
      document.body.removeChild(a); // 다운로드 후 링크 요소 제거
    }
    
    
    // 두 번째 요청: download로 downloadInfo 전송
    const downloadResponse = await fetch('https://mozit-spring-leo8071004-e7b9gwh9cuayc2gf.koreacentral-01.azurewebsites.net/edit/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(downloadInfo),
    });

    if (!downloadResponse.ok) {
      const errorResponse = await downloadResponse.text();
        throw new Error(`Network response was not ok for download: ${errorResponse}`);
    }

  } catch (error) {
    console.error('오류 발생:', error);
  } finally {
      setLoading(false);
    }
};
///////////////////////////////////////////////////////////////////

  return (
    <AppTheme {...props} sx={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <CssBaseline enableColorScheme />
      <SitemarkIcon
        sx={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          padding: '0.5rem',
        }}
      />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />

      <StyledBox onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {videoUrl ? (
          <>
            <video
              ref={videoRef}
              src={videoUrl}
              crossOrigin="anonymous"
              onLoadedMetadata={handleLoadedMetadata}
              style={{
                display: 'block',
                width: '100%', // 비디오 너비를 100%로 설정
                height: '100%', // 비디오 높이를 100%로 설정
                position: 'absolute', // 절대 위치로 설정
                top: 0,
                left: 0,
                zIndex: 1, // 비디오가 위에 오도록 설정
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
                width: '100%', // 캔버스 너비를 비디오와 동일하게 설정
                height: '100%', // 캔버스 높이를 비디오와 동일하게 설정
              }}
            />
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
        <Box
          sx={{
            position: 'absolute', // 절대 위치로 설정
            bottom: '5px',
            left: '20px',
            right: '20px',
            display: 'flex',
            alignItems: 'center',
            zIndex: 3,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
            borderRadius: '5px',
          }}
        >
          <ControlBox showControls={showControls}>
            <Button onClick={handlePlayPause}>
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </Button>
            <Slider
              id="video-slider"
              sx={{ marginLeft: '10px', flexGrow: 1 }}
              value={sliderValue} 
              onChange={handleSliderChange}
            />
          </ControlBox>
        </Box>
      </StyledBox>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={handleReEdit}>
          재편집
        </Button>
        <Button
          ref={editButtonRef}
          variant="contained"
          color="primary"
          onClick={handleDownload} // 다운로드 클릭 시 handleDownload 함수 호출
        >
          다운로드
        </Button>
      </Stack>

      {/* 영상 처리 중 메시지 추가 */}
      {loading && (
        <Typography variant="h6" sx={{ textAlign: 'center', color: 'primary.main', marginTop: 2 }}>
          영상 다운로드 중입니다. 대기해주세요...
        </Typography>
      )}
    </AppTheme>
  );
}
