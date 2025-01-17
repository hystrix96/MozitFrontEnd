import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import SitemarkIcon from '../components/SitemarkIcon';
import axios from 'axios'; // axios를 import합니다.
import {useState} from 'react';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignIn(props) {
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');

  // 파일 선택 핸들러
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileType = file.type;
    if (fileType === 'video/quicktime') {
    alert('MOV 파일은 브라우저에서 제대로 지원되지 않을 수 있습니다. MP4 파일로 변환해 주세요.');
    return;
  }
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file); // 업로드한 파일 URL 생성
      setVideoUrl(url); // 미리보기 위한 동영상 URL 설정
    }
  };

    // 파일 선택 창 트리거
  const triggerFileInput = () => {
    const fileInput = document.getElementById('video-upload');
    if (fileInput) {
      fileInput.click(); // 파일 선택 창 열기
    }
  };

  // "업로드" 버튼 클릭 핸들러
  const handleUpload = () => {
    const fileInput = document.getElementById('video-upload');
    if (fileInput) {
      fileInput.value = ''; // 파일 선택 창의 값을 초기화
      fileInput.click(); // 파일 선택 창 다시 열기
    }
  };

  const handleEditStart = () => {
    console.log('편집 시작!');
    // 편집 시작 로직 추가
  };
 
  return (
  <AppTheme {...props} sx={{ width: '100vw', height: '100vh' }}>  {/* AppTheme의 크기 설정 */}
  <CssBaseline enableColorScheme />
  <SignInContainer 
    direction="column" 
    justifyContent="space-between" 
    sx={{ width: '100vw', height: '100vh' }}  
  >
    <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
    <SitemarkIcon height={20} />
    <Card
  variant="outlined"
  sx={{
    padding: '16px',
    margin: 'auto',
    width: videoFile ? '100vw' : '300px', // 영상이 업로드되면 카드의 너비를 화면 전체로 확장
    height: videoFile ? '100vh' : '300px', // 영상이 업로드되면 카드의 높이를 화면 전체로 확장
    transition: 'width 0.3s ease-in-out, height 0.3s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: videoFile ? 'flex-start' : 'center',
    position: 'relative',
  }}
>
  <div style={{ textAlign: 'center', padding: '20px', height: '100%', flexGrow: 1 }}>
    <input
      type="file"
      accept="video/*"
      onChange={handleFileChange}
      style={{ display: 'none' }}
      id="video-upload"
    />
    {!videoFile ? (
      <div>
        <h3>동영상 미리보기 출력 화면</h3>
        <button
          onClick={triggerFileInput}
          style={{
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid #ccc',
            padding: '5px 10px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          동영상 업로드
        </button>
      </div>
    ) : (
      <div>
        <h3>업로드된 동영상</h3>
        <video
          src={videoUrl}
          controls
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain', // 영상의 비율을 유지하며 화면에 꽉 채우기
            marginBottom: '20px',
          }}
        />
      </div>
    )}
  </div>

  {/* 파일 선택과 편집 시작 버튼을 하단에 고정, videoFile이 있을 때만 버튼을 보이도록 */}
  {videoFile && (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '20px',
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)', // 가운데 정렬
      }}
    >
      <button
        onClick={handleUpload}
        style={{
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid #ccc',
          padding: '5px 10px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        파일 선택
      </button>
      <button
        onClick={handleEditStart}
        style={{
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid #ccc',
          padding: '5px 10px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        편집 시작
      </button>
    </div>
  )}
</Card>

  </SignInContainer>
</AppTheme>

  );
}
