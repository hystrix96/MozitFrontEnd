import * as React from 'react';
import { useState, useRef } from 'react';
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
  const [anchorEl, setAnchorEl] = useState(null); // Popover 상태 추가
  const [loading, setLoading] = useState(false); // 영상 처리 중 상태 추가
  const editButtonRef = useRef(null); // 편집 시작 버튼 참조 추가
   const navigate = useNavigate(); // useNavigate를 호출하여 navigate 함수 정의

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoSrc(URL.createObjectURL(file));
    } else {
      alert('동영상 파일을 업로드해주세요.');
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoSrc(URL.createObjectURL(file));
    } else {
      alert('동영상 파일을 드롭해주세요.');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleEditStart = async () => {
    if (!videoSrc) {
      setAnchorEl(editButtonRef.current); // Popover 열기
    } else {
      navigate('/mozaic', { state: { videoUrl: videoSrc } });
      // setLoading(true); // 영상 처리 중 상태 시작
      // try {
      //   // 서버로 동영상 전송 (예시: fetch를 사용하여 서버로 요청)
      //   const formData = new FormData();
      //   const videoFile = videoSrc; // 실제 파일을 보내야 함
      //   formData.append('video', videoFile);

      //   // 서버로 동영상 전송 (백엔드 URL로 변경)
      //   const response = await fetch('/backend/upload', {
      //     method: 'POST',
      //     body: formData,
      //   });

      //   if (response.ok) {
      //     // 서버에서 처리된 영상이 오면 처리된 영상으로 업데이트
      //     const processedVideo = await response.blob();
      //     const videoURL = URL.createObjectURL(processedVideo);
      //     console.log('편집 시작! 처리 완료');
      //     navigate('/mozaic', { state: { videoUrl: videoURL } }); // navigate()로 새 페이지로 이동
      //   } else {
      //     alert('서버 오류 발생');
      //   }
      // } catch (error) {
      //   alert('동영상 처리 중 오류가 발생했습니다.');
      // } finally {
      //   setLoading(false); // 처리 완료 후 로딩 종료
      // }
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
        {videoSrc ? (
          <video
            src={videoSrc}
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
