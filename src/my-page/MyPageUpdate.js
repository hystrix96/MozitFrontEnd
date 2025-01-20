import * as React from 'react';
import { FormControl, FormLabel, TextField, Box, Typography, Button, CssBaseline, Stack, styled, Avatar } from '@mui/material';
import MuiCard from '@mui/material/Card';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';  // 사진 아이콘 추가

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

export default function MyPageCheck(props) {
  const [password, setPassword] = React.useState('');
  const [inputPassword, setInputPassword] = React.useState('');
  const [isPasswordVerified, setIsPasswordVerified] = React.useState(false);
  const [error, setError] = React.useState('');
  const [openDialog, setOpenDialog] = React.useState(false);
  const [userData, setUserData] = React.useState(null);
  const [profileImage, setProfileImage] = React.useState(null);
  const [profileImagePreview, setProfileImagePreview] = React.useState(null);
  const { accessToken, userEmail, username, setAccessToken, setUsername } = useAuth();

  React.useEffect(() => {
    // 사용자 정보 가져오기 (예: 프로필 API 요청)
    axios
      .get('/users/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      })
      .then((response) => {
        setUserData(response.data);
        setPassword(response.data.userPwd); // 기존 비밀번호 설정
      })
      .catch((error) => {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error);
      });
  }, []);

  const handlePasswordCheck = () => {
    if (inputPassword === password) {
      setIsPasswordVerified(true);
      setError('');
    } else {
      setError('비밀번호가 일치하지 않습니다.');
      setOpenDialog(true);
    }
  };

  const handleUserUpdate = (event) => {
    event.preventDefault();
    const updatedData = new FormData(event.target);

    if (profileImage) {
      updatedData.append('profileImage', profileImage);
    }

    axios
      .put('/users/profile', updatedData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      })
      .then((response) => {
        alert('정보가 성공적으로 수정되었습니다.');
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('정보 수정 중 오류 발생:', error);
      });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file)); // 이미지 미리보기 생성
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Stack sx={{ minHeight: '100vh' }} justifyContent="center">
        <Card variant="outlined">
          <Typography variant="h4" component="h1" sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)', fontWeight: 'bold' }}>
            사용자 정보 수정
          </Typography>
          {!isPasswordVerified ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              {/* 비밀번호 입력 및 확인 */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                {/* 프로필 사진과 사용자 정보 */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      border: '3px solid #ddd',
                      mb: 2, // 이미지와 텍스트 간격
                    }}
                    src={profileImagePreview || userData?.profileImage || 'your-default-image-url'}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {`${username}`}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'gray' }}>
                    {`${userEmail}` || '이메일 주소'}
                  </Typography>
                </Box>

                {/* 비밀번호 확인 */}
                <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                  비밀번호를 입력하여 본인 확인을 진행해주세요.
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel htmlFor="password">비밀번호</FormLabel>
                    <TextField
                      name="password"
                      type="password"
                      variant="standard"
                      fullWidth
                      value={inputPassword}
                      onChange={(e) => setInputPassword(e.target.value)}
                      sx={{
                        mb: 0,
                        '& .MuiInput-underline:before': {
                          borderBottom: '1px solid #ccc', // 기본 밑줄 스타일
                        },
                        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                          borderBottom: '2px solid #1976d2', // hover 시 밑줄 색상 변경
                        },
                      }}
                    />
                  </FormControl>

                  <Button variant="contained" onClick={handlePasswordCheck} sx={{ ml: 2, height: '100%' }}>
                    확인
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleUserUpdate}>
              <Typography variant="body1" gutterBottom>
                정보를 수정한 후 저장하세요.
              </Typography>

              {/* 비밀번호 확인 후 프로필 사진 수정 */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      border: '3px solid #ddd',
                      mb: 2, // 이미지와 텍스트 간격
                    }}
                    src={profileImagePreview || userData?.profileImage || 'your-default-image-url'}
                  />
                  {/* 사진 아이콘 */}
                  <label htmlFor="profileImage" style={{ position: 'absolute', bottom: 0, right: 0, cursor: 'pointer' }}>
                    <CameraAltIcon sx={{ fontSize: 30, color: '#fff', backgroundColor: '#1976d2', borderRadius: '50%', padding: 0.5 }} />
                  </label>
                  <input
                    type="file"
                    id="profileImage"
                    hidden
                    accept="image/*"
                    onChange={handleProfileImageChange}
                  />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {userData?.userName || '사용자 이름'}
                </Typography>
                <Typography variant="body2" sx={{ color: 'gray' }}>
                  {userData?.userEmail || '이메일 주소'}
                </Typography>
              </Box>

              <Box sx={{ width: '100%', borderBottom: '1px solid #ccc', mb: 2 }} /> {/* 밑줄 */}
              pw 입력 pw 확인

              {/* 수정할 사용자 정보 폼 */}
              <Box sx={{ width: '100%', borderBottom: '1px solid #ccc', mb: 2 }} />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel htmlFor="userName">이름</FormLabel>
                <TextField
                  name="userName"
                  label="이름"
                  defaultValue={userData?.userName || ''}
                  variant="outlined"
                  fullWidth
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel htmlFor="userEmail">이메일</FormLabel>
                <TextField
                  name="userEmail"
                  label="이메일"
                  defaultValue={userData?.userEmail || ''}
                  variant="outlined"
                  fullWidth
                />
              </FormControl>
              <Box sx={{ width: '100%', borderBottom: '1px solid #ccc', mb: 2 }} />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel htmlFor="enterpriseName">회사 이름</FormLabel>
                <TextField
                  name="enterpriseName"
                  label="회사 이름"
                  defaultValue={userData?.enterpriseName || ''}
                  variant="outlined"
                  fullWidth
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel htmlFor="enterpriseAddr">회사 주소</FormLabel>
                <TextField
                  name="enterpriseAddr"
                  label="회사 주소"
                  defaultValue={userData?.enterpriseAddr || ''}
                  variant="outlined"
                  fullWidth
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel htmlFor="enterpriseCall">회사 전화번호</FormLabel>
                <TextField
                  name="enterpriseCall"
                  label="회사 전화번호"
                  defaultValue={userData?.enterpriseCall || ''}
                  variant="outlined"
                  fullWidth
                />
              </FormControl>
              <Box sx={{ width: '100%', borderBottom: '1px solid #ccc', mb: 2 }} />
              <Button variant="contained" type="submit">
                저장
              </Button>
            </Box>
          )}
        </Card>

        {openDialog && (
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 999 }}>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
              <DialogTitle>오류</DialogTitle>
              <DialogContent>
                <DialogContentText>{error}</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)} color="primary">
                  확인
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}
      </Stack>
      <Footer />
    </AppTheme>
  );
}
