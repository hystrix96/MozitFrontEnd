import React from 'react';
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

export default function MozaicPage() {
  const location = useLocation();
  const videoUrl = location.state?.videoUrl; // 전달된 videoUrl 받기
  const [value, setValue] = React.useState(0); // 탭 상태 추가

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppTheme sx={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <CssBaseline />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <Box sx={{ display: 'flex', height: '100%', padding: 2 }}>
        <Box sx={{ width: '150%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
            <video
              src={videoUrl}
              controls
              style={{
                display: 'block',
                margin: '20px auto',
                maxWidth: '80%',
                height: 'auto',
              }}
            />
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

        <Box sx={{ width: '40%', padding: 2 }}>
          <Tabs value={value} onChange={handleTabChange} sx={{ marginBottom: 2 }}>
            <Tab label="유해요소" />
            <Tab label="개인정보" />
            <Tab label="사람" />
          </Tabs>

          {value === 0 && (
            <Box>
              <Typography variant="h6">마스크 설정</Typography>
              <FormControlLabel control={<Checkbox />} label="모자이크" />
              <FormControlLabel control={<Checkbox />} label="블러" />
              <Typography variant="h6">마스크 강도</Typography>
              <Slider defaultValue={50} aria-label="Mask Intensity" />
              <Typography variant="h6">마스크 크기</Typography>
              <Slider defaultValue={100} aria-label="Mask Size" />
              <Typography variant="h6">마스크 체크</Typography>
              <FormControlLabel control={<Checkbox />} label="사람 1" />
              <FormControlLabel control={<Checkbox />} label="사람 2" />
              <FormControlLabel control={<Checkbox />} label="사람 3" />
            </Box>
          )}
          {value === 1 && (
            <Box>
               <Typography variant="h6">마스크 설정</Typography>
              <FormControlLabel control={<Checkbox />} label="모자이크" />
              <FormControlLabel control={<Checkbox />} label="블러" />
              <Typography variant="h6">마스크 강도</Typography>
              <Slider defaultValue={50} aria-label="Mask Intensity" />
              <Typography variant="h6">마스크 크기</Typography>
              <Slider defaultValue={100} aria-label="Mask Size" />
              <Typography variant="h6">마스크 체크</Typography>
              <FormControlLabel control={<Checkbox />} label="사람 1" />
              <FormControlLabel control={<Checkbox />} label="사람 2" />
              <FormControlLabel control={<Checkbox />} label="사람 3" />
            </Box>
          )}
          {value === 2 && (
            <Box>
              <Typography variant="h6">마스크 설정</Typography>
              <FormControlLabel control={<Checkbox />} label="모자이크" />
              <FormControlLabel control={<Checkbox />} label="블러" />
              <Typography variant="h6">마스크 강도</Typography>
              <Slider defaultValue={50} aria-label="Mask Intensity" />
              <Typography variant="h6">마스크 크기</Typography>
              <Slider defaultValue={100} aria-label="Mask Size" />
              <Typography variant="h6">마스크 체크</Typography>
              <FormControlLabel control={<Checkbox />} label="사람 1" />
              <FormControlLabel control={<Checkbox />} label="사람 2" />
              <FormControlLabel control={<Checkbox />} label="사람 3" />
            </Box>
          )}
        </Box>
      </Box>

      <Stack direction="row" spacing={2} sx={{ marginTop: 2, justifyContent: 'center' }}>
        <Button variant="contained" color="primary" component={Link} to="/edit">
          돌아가기
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => {/* 다른 동작 */}}>
          편집완료
        </Button>
      </Stack>
    </AppTheme>
  );
}
