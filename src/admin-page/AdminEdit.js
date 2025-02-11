import MenuContent from '../dashboard/components/MenuContent'
import Header from '../dashboard/components/Header'
import { alpha } from '@mui/material/styles';

import * as React from 'react';
import { FormControl, FormLabel, TextField, Box, Typography, Button, CssBaseline, Stack, styled, Avatar } from '@mui/material';
import MuiCard from '@mui/material/Card';
import AppTheme from '../shared-theme/AppTheme';
import { useAuth } from '../Context/AuthContext';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, InputAdornment } from '@mui/material';
import axiosInstance from '../api/axiosInstance';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useNavigate } from 'react-router-dom';


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


const validatePassword = (password) => {
  const minLength = 8;
  const hasTwoTypes =
    /(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*\d)|(?=.*[a-z])(?=.*[!@#$%^&*()_+])|(?=.*[A-Z])(?=.*\d)|(?=.*[A-Z])(?=.*[!@#$%^&*()_+])|(?=.*\d)(?=.*[!@#$%^&*()_+])/;
  return password.length >= minLength && hasTwoTypes.test(password);
};

export default function AdminEdit(props) {

  const [inputPassword, setInputPassword] = React.useState('');
  const [isPasswordVerified, setIsPasswordVerified] = React.useState(false);
  const [error, setError] = React.useState('');
  const [openDialog, setOpenDialog] = React.useState(false);
  const [userData, setUserData] = React.useState({
    userNum: null,
    userId: '',
    userName: '',
    userEmail: '',
    enterpriseName: '',
    enterpriseNum: null,
  });
  const [profileImage, setProfileImage] = React.useState(null);
  const [profileImagePreview, setProfileImagePreview] = React.useState(null);
  const { accessToken, userEmail, username, setAccessToken, setUsername } = useAuth();
  const [userPwd, setUserPwd] = React.useState('');
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
  const [confirmPwd, setConfirmPwd] = React.useState('');
  const [isConfirmPwdValid, setIsConfirmPwdValid] = React.useState(false);
  // 상태 추가
  const [isPasswordSameAsOld, setIsPasswordSameAsOld] = React.useState(false);

  React.useEffect(() => {
    fetchUserData();
  }, []);

  const handlePasswordCheck = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post(
        '/my/verify-password',
        inputPassword,
        {
          headers: {
            'Content-Type': 'text/plain',
          },
        }
      );

      if (response.status === 200) {
        setIsPasswordVerified(true);
        setError('');
        alert('비밀번호 확인 성공!');
        fetchUserData();
      }
    } catch (error) {
      setIsPasswordVerified(false);
      setError('비밀번호가 일치하지 않습니다.');
      setOpenDialog(true);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get('/my');
      setUserData(response.data);
    } catch (error) {
      console.error('관리자 정보를 가져오는 중 오류 발생:', error);
      setError('관리자 정보를 가져오는 중 오류가 발생했습니다.');
      setOpenDialog(true);
    }
  };

  const navigate = useNavigate();

  const handleUserUpdate = async (event) => {
    event.preventDefault();

    const updatedData = {};

    if (event.target.userName.value !== userData.userName) {
      updatedData.userName = event.target.userName.value;
    }

    if (event.target.userEmail.value !== userData.userEmail) {
      updatedData.userEmail = event.target.userEmail.value;
    }

    if (userPwd && isPasswordValid) {
      updatedData.userPwd = userPwd; // 비밀번호 유효성 검사 통과 시 추가
    } else if (userPwd && !isPasswordValid) {
      alert("새 비밀번호가 유효하지 않습니다. 다시 확인해주세요.");
      return;
    }

    if (isPasswordSameAsOld) {
      alert("새 비밀번호가 기존 비밀번호와 동일합니다. 다른 비밀번호를 입력해주세요.");
      return;
    }

    // 요청할 데이터가 없는 경우 경고 메시지
    if (Object.keys(updatedData).length === 0) {
      alert("변경된 사항이 없습니다.");
      return;
    }

    try {
      const response = await axiosInstance.patch('/my', updatedData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        alert('정보가 성공적으로 수정되었습니다.');
        setUserData((prevData) => ({
          ...prevData, // 기존 데이터 유지
          ...updatedData, // 변경된 데이터 병합
        }));

        if (updatedData.userName) {
          setUsername(updatedData.userName);
        }

        localStorage.removeItem('userToken');
        setAccessToken(null);
        setUsername(null);

        await handleLogout();  // 로그아웃 로직 호출
        navigate('/sign-in');
      }
    } catch (error) {
      console.error('정보 수정 중 오류 발생:', error);
      alert('정보 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

    const handleLogout = async () => {
  try {
    const response = await axiosInstance.post('/users/logout', {}, {
      headers: {
        Authorization: accessToken, // 액세스 토큰을 헤더에 포함
      },
    });

    if (response.status === 200) {
    } else {
      throw new Error('로그아웃 실패');
    }
  } catch (error) {
    console.error('로그아웃 에러:', error);
    alert('로그아웃 요청 중 문제가 발생했습니다.');
  }
};

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file)); // 이미지 미리보기 생성
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setUserPwd(password);
    setIsPasswordValid(validatePassword(password));

    // 기존 비밀번호와 새 비밀번호 비교
    if (password === inputPassword) {
      setIsPasswordSameAsOld(true); // 비밀번호가 같으면 오류 표시
    } else {
      setIsPasswordSameAsOld(false); // 비밀번호가 다르면 오류 해제
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPwd(confirmPassword);
    setIsConfirmPwdValid(confirmPassword === userPwd && validatePassword(userPwd));
  };


  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <MenuContent />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={-8}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <Box sx={{
              maxWidth: 1000,
              width: '100%',
            }}
            >
              {/* <Typography>AdminEdit</Typography> */}
              <Stack sx={{ minHeight: '100vh' }} justifyContent="center">
                <Card variant="outlined">
                  <Typography variant="h4" component="h1" sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)', fontWeight: 'bold', textAlign: 'center' }}>
                    관리자 정보 수정
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
                              onKeyDown={(e) => {
                                if (e.key === "Enter") { //엔터키
                                  e.preventDefault(); // 기본 제출 방지
                                  handlePasswordCheck(e); // event 객체를 넘김
                                }
                              }}
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
                          <label htmlFor="profileImage" style={{ position: 'absolute', bottom: 0, right: 0, cursor: 'pointer' }}></label>
                          <input
                            type="file"
                            id="profileImage"
                            hidden
                            accept="image/*"
                            onChange={handleProfileImageChange}
                          />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {userData.userName || '사용자 이름'}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'gray' }}>
                          {userData.userEmail || '이메일 주소'}
                        </Typography>
                      </Box>

                      {/* 수정할 사용자 정보 폼 */}
                      <Box sx={{ width: '100%', borderBottom: '1px solid #ccc', mb: 2 }} />
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField
                          name="userName"
                          label="이름"
                          defaultValue={userData.userName || ''}
                          variant="outlined"
                          fullWidth
                        />
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField
                          name="userEmail"
                          label="이메일"
                          defaultValue={userData.userEmail || ''}
                          variant="outlined"
                          fullWidth
                          disabled={true}
                        />
                      </FormControl>
                      <Box sx={{ width: '100%', borderBottom: '1px solid #ccc', mb: 2 }} />
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField
                          name="enterpriseName"
                          label="회사 이름"
                          defaultValue={userData.enterpriseName || ''}
                          variant="outlined"
                          fullWidth
                          disabled={true}
                        />
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField
                          name="enterpriseNum"
                          label="사업자번호"
                          defaultValue={userData.enterpriseNum || ''}
                          variant="outlined"
                          fullWidth
                          disabled={true}
                        />
                      </FormControl>

                      <Box sx={{ width: '100%', borderBottom: '1px solid #ccc', mb: 2 }} />
                      {/* 비밀번호 변경 */}
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField
                          name="userPwd"
                          label="새 비밀번호"
                          type="password"
                          variant="outlined"
                          fullWidth
                          onChange={handlePasswordChange}
                          error={!isPasswordValid && userPwd.length > 0 || isPasswordSameAsOld} // 비밀번호가 유효하지 않거나 기존 비밀번호와 같을 때 오류
                          helperText={
                            isPasswordSameAsOld
                              ? "기존 비밀번호와 같습니다." // 기존 비밀번호와 같을 때 메시지
                              : !isPasswordValid && userPwd.length > 0
                                ? "영문소문자, 영어대문자, 숫자, 특수문자 중 2개 이상 조합하여 8자 이상 입력하세요."
                                : "영문소문자, 영어대문자, 숫자, 특수문자 중 2개 이상 조합하여 8자 이상 입력하세요."
                          }
                          InputProps={{
                            endAdornment: !isPasswordSameAsOld && isPasswordValid ? (
                              <InputAdornment position="end">
                                <TaskAltIcon color="success" sx={{ fontSize: 17 }} />
                              </InputAdornment>
                            ) : null,
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField
                          name="confirmPwd"
                          label="비밀번호 재입력"
                          type="password"
                          variant="outlined"
                          fullWidth
                          onChange={handleConfirmPasswordChange}
                          error={!isConfirmPwdValid && confirmPwd.length > 0} // 조건에 따라 빨간색 경고 표시
                          helperText={
                            !isConfirmPwdValid && confirmPwd.length > 0
                              ? "비밀번호가 일치하지 않습니다."
                              : " "
                          }
                          InputProps={{
                            endAdornment: isConfirmPwdValid ? (
                              <InputAdornment position="end">
                                <TaskAltIcon color="success" sx={{ fontSize: 17 }} />
                              </InputAdornment>
                            ) : null,
                          }}
                        />
                      </FormControl>

                      <Box sx={{ width: '100%', borderBottom: '1px solid #ccc', mb: 2 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button variant="contained" type="submit" disabled={!isConfirmPwdValid}>
                          저장
                        </Button>
                      </Box>
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
            </Box>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}