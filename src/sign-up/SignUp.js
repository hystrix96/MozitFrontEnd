import * as React from 'react';
import { FormControl, FormLabel, TextField, Box, Typography } from '@mui/material';
// import Box from '@mui/material/Box';
// import FormLabel from '@mui/material/FormLabel';
// import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
import { Button, CssBaseline, Divider, Stack, styled } from '@mui/material';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import Stack from '@mui/material/Stack';
// import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './components/CustomIcons';
import { DaumPostcodeEmbed } from 'react-daum-postcode';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: '100vh)',
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

export default function SignUp(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [detailAddress, setDetailAddress] = React.useState('');
  const [isPostcodeOpen, setIsPostcodeOpen] = React.useState(false);

  // 인증 관련 상태 추가
  const [isCodeSent, setIsCodeSent] = React.useState(false);
  const [authCode, setAuthCode] = React.useState('');
  const [authCodeError, setAuthCodeError] = React.useState(false);
  const [timer, setTimer] = React.useState(0); // 인증 시간 (초)
  const [isCodeExpired, setIsCodeExpired] = React.useState(false);

// 주소찾기 관련
  const handlePostcodeComplete = (data) => {
    setAddress(data.address);
    setIsPostcodeOpen(false); // Close the postcode popup after selecting address
  };

  const handleOpenPostcode = () => {
    setIsPostcodeOpen(true);
  };

// Email인증관련
  const handleSendCode = () => {
    // 여기에서 실제 인증 코드 보내는 API 호출 로직을 넣을 수 있습니다
    setIsCodeSent(true);
    setTimer(180); // 3분 (180초)
    setIsCodeExpired(false);
  };

  const handleVerifyCode = () => {
    if (authCode === '123456') { // 인증 코드 검증 (예시)
      setAuthCodeError(false);
      alert('인증 성공');
    } else {
      setAuthCodeError(true);
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const name = document.getElementById('name');
    let isValid = true;

    // Email validation
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }
    // ID유효성 검사

    // 비밀번호 유효성 검사
    // 영어, 숫자, 특수문자 중 두 가지 유형 이상 포함, 길이는 10자 이상 16자 이하
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*+=\-_])[a-zA-Z\d!@#$%^&*+=\-_]{10,16}$/;
    const specialCharRegex = /^[a-zA-Z0-9!@#$%^&*+=\-_]*$/;  // 허용되지 않는 특수문자 제외
    if (!password || password.length < 8 || password.length > 16 || !passwordRegex.test(password)) {
      setPasswordError(true);
      setPasswordErrorMessage('비밀번호는 10자 이상 16자 이하로 영어, 숫자 또는 특수문자 중 두 가지 유형 이상을 포함해야 합니다.');
      isValid = false;
    } else if (password !== confirmPassword) {
      setPasswordError(true);
      setPasswordErrorMessage('비밀번호가 서로 다릅니다.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    // Name validation
    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }
    return isValid;
  };

  //전화번호 유효성 검사
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    if (nameError || emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      address,
      detailAddress,
    });
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            회원가입
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">이름</FormLabel>
              <TextField
                required
                fullWidth
                name="name"
                placeholder="Name"
                // type="email"
                id="name"
                autoComplete="off"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Box display="flex" alignItems="center" gap={1}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  placeholder="Your Email"
                  type="email"
                  id="email"
                  autoComplete="off"
                  error={emailError}
                  helperText={emailErrorMessage}
                />
                  <Button
                  variant="contained"
                  onClick={handleSendCode}
                  disabled={isCodeSent || isCodeExpired}
                >
                  {isCodeSent 
                    ? `인증 시간: ${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${timer % 60} 남음`
                    : '인증'}
                </Button>
              </Box>
            </FormControl>

            {/* 인증 코드 입력 */}
            {isCodeSent && !isCodeExpired && (
              <FormControl>
                <FormLabel htmlFor="auth-code">인증 코드</FormLabel>
                <TextField
                  required
                  name="auth-code"
                  placeholder="인증 코드"
                  id="auth-code"
                  autoComplete="off"
                  error={authCodeError}
                  helperText={authCodeError ? '인증 코드가 일치하지 않습니다.' : ''}
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                />
                <Button variant="contained" onClick={handleVerifyCode}>확인</Button>
              </FormControl>
            )}

            <Divider>
              <Typography sx={{ color: 'text.secondary' }}></Typography>
            </Divider>

            <FormControl>
              <FormLabel htmlFor="email">ID</FormLabel>
              <Box display="flex" alignItems="center" gap={1}>
                <TextField
                  required
                  name="ID"
                  placeholder="ID(ID@example.com)"
                  type="email"
                  id="ID"
                  autoComplete="off"
                  error={emailError}
                  helperText={emailErrorMessage}
                  sx={{ width: '280px' }}
                />
                <Button variant="contained">중복 확인</Button>
              </Box>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={handlePasswordChange}
                error={passwordError}
                helperText={passwordErrorMessage}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="confirm-password">PW확인</FormLabel>
              <TextField
                required
                fullWidth
                name="confirm-password"
                placeholder="••••••"
                type="password"
                id="confirm-password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                error={passwordError && password !== confirmPassword}
                helperText={passwordError && password !== confirmPassword ? '비밀번호가 다릅니다다!' : ''}
              />
              {password && confirmPassword && password !== confirmPassword && (
                <div style={{ color: 'red', marginTop: '8px' }}>
                  <small>비밀번호가 다릅니다!</small>
                </div>
              )}
            </FormControl>
            <Divider>
              <Typography sx={{ color: 'text.secondary' }}></Typography>
            </Divider>
            <FormControl>
              <FormLabel htmlFor="address">회사명</FormLabel>
              {/* 회사명 */}
              <TextField
                fullWidth
                name="co-name"
                placeholder="회사명"
              // value={detailAddress}
              // onChange={(e) => setDetailAddress(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="address">대표번호</FormLabel>
              {/* 대표번호 */}
              <TextField
                fullWidth
                name="co-num"
                placeholder="대표번호"
                type="tel"
              // value={detailAddress}
              // onChange={(e) => setDetailAddress(e.target.value)}
              />
            </FormControl>
            {/* Address Section */}
            <FormControl>
              <FormLabel htmlFor="address">주소</FormLabel>
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  fullWidth
                  value={address}
                  placeholder="Address"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Button color="primary" onClick={handleOpenPostcode}
                  sx={{
                    width: '150px'
                  }}
                >
                  주소 찾기
                </Button>
              </Stack>
            </FormControl>
            <FormControl>
              {/* <FormLabel htmlFor="detail-address">Detail Address</FormLabel> */}
              <TextField
                fullWidth
                name="detail-address"
                placeholder="세부주소"
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
                sx={{ maxWidth: '40%' }}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign up
            </Button>
          </Box>
        </Card>
      </SignUpContainer>



      {isPostcodeOpen && (
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',  // 반투명 배경
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Box sx={{
            background: 'white',
            padding: 3,
            borderRadius: 2,
            maxWidth: '90%',
            maxHeight: '80%',
            overflow: 'auto',
            position: 'relative', // 닫기 버튼 위치 조정용
          }}>
            {/* 닫기 버튼 */}
            <Button
              onClick={() => setIsPostcodeOpen(false)} // 팝업 닫기
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                padding: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderRadius: '50%',
                minWidth: '30px',
                minHeight: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <Typography variant="body2" sx={{ color: 'white' }}>X</Typography>
            </Button>
            {/* Daum 우편번호 서비스 컴포넌트 */}
            <DaumPostcodeEmbed
              onComplete={handlePostcodeComplete}
              autoClose={false}
              defaultQuery=""
            />
          </Box>
        </Box>
      )}
    </AppTheme>
  );
}
