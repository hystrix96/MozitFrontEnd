import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Popover from '@mui/material/Popover'; // Popover 추가
import Alert from '@mui/material/Alert'; // Alert 추가
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import SitemarkIcon from '../components/SitemarkIcon';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import { uploadVideoToAzure } from '../utils/azureBlobService';

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

export default function EditPage(props) {
  const [videoSrc, setVideoSrc] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // Popover 상태 추가
  const [loading, setLoading] = useState(false); // 영상 처리 중 상태 추가
  const [error, setError] = useState(''); // 에러 메시지
  const editButtonRef = useRef(null); // 편집 시작 버튼 참조 추가
  const navigate = useNavigate(); // useNavigate를 호출하여 navigate 함수 정의
  const { accessToken } = useAuth();
  const [sub, setSub] = useState(null);

  const maxFileSize = {
    Basic: 100,
    Pro: 1000,
    Premium: 30000,
  }

  useEffect(() => {
    const fetchSub = async () => {
      try{
          const response = await axiosInstance.get('/my');
          if(!response.data.userSub){
            alert("구독자 전용 서비스입니다.");
            navigate("/mysubpage");
            return;
          }
          setSub(response.data.userSub);
      }catch(error){
          console.error('구독 정보 가져오는 중 오류 발생:', error);
          alert("구독 정보 가져오는 중 오류가 발생했습니다.");
          navigate("/mysubpage");
      }
    };

    fetchSub();
  }, [navigate]);

  const maxFileSizeMB = maxFileSize[sub] || 200;
  const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;

  const allowedExtensions = ['.mp4']; // 허용할 확장자 목록 (mp4만 허용)
  const allowedMimeTypes = ['video/mp4']; // 허용할 MIME 타입 (mp4만 허용)

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setError("파일을 업로드해주세요.");
      return;
    }

    if (!sub) {
      setError("구독 정보를 확인할 수 없습니다. 다시 시도해주세요.");
      return;
    }
  
    const fileExtension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  
    if (file.size > maxFileSizeBytes) {
      setError(`파일 크기가 너무 큽니다! (${maxFileSizeMB}MB 이하만 업로드 가능)`);
      return;
    }
  
    if (allowedExtensions.includes(fileExtension) && (!file.type || allowedMimeTypes.includes(file.type))) {
      setVideoFile(file);
      setVideoSrc(URL.createObjectURL(file));
      setError(""); // 에러 메시지 초기화
    } else {
      setError("허용되지 않는 파일 형식입니다. MP4 파일만 업로드 가능합니다.");
    }
  };
  
  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files.length > 1) {
      setError("한 번에 하나의 동영상만 업로드 가능합니다.");
      return;
    }
  
    const file = event.dataTransfer.files[0];
    if (!file) {
      setError("파일을 드롭해주세요.");
      return;
    }
  
    const fileExtension = `.${file.name.split(".").pop().toLowerCase()}`;
  
    if (file.size > maxFileSizeBytes) {
      setError(`파일 크기가 너무 큽니다! (${maxFileSizeMB}MB 이하만 업로드 가능)`);
      return;
    }
  
    if (allowedExtensions.includes(fileExtension) && allowedMimeTypes.includes(file.type)) {
      setVideoFile(file);
      setVideoSrc(URL.createObjectURL(file));
      setError(""); // 에러 메시지 초기화
    } else {
      setError("허용되지 않는 파일 형식입니다. MP4 파일만 업로드 가능합니다.");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleEditStart = async () => {
    if (!videoFile) {
      setError("동영상을 업로드해주세요.");
      return;
    }
  
    setLoading(true);
    setError("");
  
    // 비디오가 있을 경우 Azure에 업로드하고 URL 가져오기
    let uploadedVideoUrl = '';
    if (videoFile) {
      uploadedVideoUrl = await uploadVideoToAzure(videoFile);
    }

   
    
    try {
      // Step 1: 동영상 파일 업로드 + T썸네일 추출 + DB 저장
      const uploadResponse = await axiosInstance.post("/edit/start-editing", {
      videoUrl: uploadedVideoUrl
      }, {
      headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
      },
      });
  
      const { editNum } = uploadResponse.data;
      const outputPath = "uploads/output.json";   //fastapi에서 저장할 경로
  

      // Step 2: 동영상 경로 FastAPI에 전송
      const response = await axiosInstance.post(
        "/edit/send-video-path",
        { video_path: uploadedVideoUrl, output_path: outputPath },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      const detection_data=response.data
      //mozaic페이지로 넘어감. 
      navigate("/mozaic", { state: { editNum,uploadedVideoUrl,detection_data } });
  
    } catch (error) {
      if (error.response) {
        console.error("응답 오류:", error.response.data);
        setError("서버 오류: " + error.response.data.detail || error.response.data);  // 응답 오류가 있을 경우 세부 정보 표시
      } else {
        console.error("에러 발생:", error.message);
        setError("요청 처리 중 문제가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  const handleClosePopover = () => {
    setAnchorEl(null); // Popover 닫기
  };

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

      <StyledBox onDrop={handleDrop} onDragOver={handleDragOver}>
        {videoSrc  ? (
          <video
            src={videoSrc }
            controls
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'fill' }}
          />
        ) : (
          <Typography
            component="h2"
            variant="h4"
            gutterBottom
            sx={{
              color: 'text.primary',
              position: 'absolute',
              textAlign: 'center',
            }}
          >
            동영상 미리보기 출력화면
            <br />
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: { xs: 2, sm: 4 } }}>
              파일을 드래그하거나 업로드 버튼을 클릭하세요
            </Typography>
          </Typography>
        )}
      </StyledBox>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
        <Button variant="contained" color="primary" component="label">
          파일 업로드
          <input type="file" accept="video/*" hidden onChange={handleFileUpload} />
        </Button>
        <Button
          ref={editButtonRef} // 버튼에 참조 추가
          variant="contained"
          color="primary"
          onClick={handleEditStart}
        >
          편집 시작
        </Button>
      </Stack>

      <div style={{ paddingTop: '15px', display: 'flex', justifyContent: 'center' }}>
        {error && (
          <Alert severity="error" sx={{ width: '50%' }}>
            {error}
          </Alert>
        )}
      </div>

      {/* Popover 추가 */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right', // 오른쪽으로 띄우기
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            marginLeft: '8px', // 버튼과 Popover 사이의 간격 추가
          },
        }}
      >
        <Alert severity="warning" onClose={handleClosePopover}>
          동영상을 업로드해주세요!
        </Alert>
      </Popover>

      {/* 영상 처리 중 메시지 추가 */}
      {loading && (
        <Typography variant="h6" sx={{ textAlign: 'center', color: 'primary.main', marginTop: 2 }}>
          영상 처리 중입니다. 대기해주세요...
        </Typography>
      )}
    </AppTheme>
  );
}
