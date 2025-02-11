import * as React from 'react';
import { FormControl, FormLabel, TextField, Box, Typography } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Button, CssBaseline, Divider, Stack, styled, InputAdornment } from '@mui/material';
import MuiCard from '@mui/material/Card';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import SitemarkIcon from '../components/SitemarkIcon';
import axiosInstance from '../api/axiosInstance';

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
  height: '100vh',
  minHeight: '950px',
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
  const [emailDisabled, setEmailDisabled] = React.useState(false);
  const [passwordDisabled, setPasswordDisabled] = React.useState(false);
  const [idDisabled, setIdDisabled] = React.useState(false);

  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(true);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [confirmpasswordError, setConfirmPasswordError] = React.useState('true');
  const [confirmpasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState('');
  const [passwordVerified, setPasswordVerified] = React.useState(false);

  const [name, setName] = React.useState(""); // 이름 상태
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');

  // 이메일 인증 관련 상태 추가
  const [isCodeSent, setIsCodeSent] = React.useState(false);
  const [authCode, setAuthCode] = React.useState('');
  const [authCodeError, setAuthCodeError] = React.useState(false);
  const [timer, setTimer] = React.useState(0); // 인증 시간 (초)
  const [isCodeExpired, setIsCodeExpired] = React.useState(false);
  const [emailVerified, setEmailVerified] = React.useState(false);

  //아이디 중복확인
  const [idError, setIdError] = React.useState(false);
  const [idErrorMessage, setIdErrorMessage] = React.useState('');
  const [idVerified, setIdVerified] = React.useState(false);
  //사업자번호 확인
  const [businessNumberError, setBusinessNumberError] = React.useState(false);
  const [businessNumberErrorMessage, setBusinessNumberErrorMessage] = React.useState('');
  const [isBusinessNumberVerified, setIsBusinessNumberVerified] = React.useState(false);
  const [isCompanyNameDisabled, setIsCompanyNameDisabled] = React.useState(false);

  //타이머 설정
  React.useEffect(() => {
    let interval;
    if (isCodeSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsCodeExpired(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isCodeSent, timer]);

  //이름 입력 확인
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);

    // 에러 처리 로직 (예: 값이 비어 있으면 에러)
    if (value.trim() === "") {
      setNameError(true);
      setNameErrorMessage("이름을 입력해주세요.");
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }
  };

  //이메일 인증 요청

  const checkEmail = async (userEmail) => {
    try {
      const response = await axiosInstance.get('/users/check-email', {
        params: { userEmail },
        validateStatus: (status) => {
          return status === 201 || status === 409;
        },
      });

      if (response.status === 201) {
        return true;
      } else if (response.status === 409) {
        console.error('이미 사용 중인 이메일입니다.');
        return false;
      }
    } catch (error) {
      console.error('이메일 중복 확인 중 오류 발생:', error);
      alert('이메일 중복 확인 중 오류가 발생했습니다.');
      return false;
    }
  };
  const handleSendCode = async () => {
    const emailInput = document.getElementById('email');
    const email = emailInput.value;

    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

    if (!email || !emailRegEx.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('이메일 계정이 유효하지 않습니다.');
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    const isEmailValid = await checkEmail(email);
    if (!isEmailValid) {
      setEmailError(true);
      setEmailErrorMessage('이미 사용 중인 이메일입니다.');
      return; // 중복된 이메일이므로 인증 코드 전송 중단
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }


    try {
      const response = await axiosInstance.post('/users/send-email', {
        mail: email,
      });

      if (response.status === 200) {
        setIsCodeExpired(false);
        setIsCodeSent(true);
        setTimer(180); // 3분 타이머 설정
        setIsCodeExpired(false);
        alert('인증 코드가 이메일로 전송되었습니다.');
      }
      else {
        setIsCodeExpired(false);
        setIsCodeSent(false);
        throw new Error('인증 코드 전송 실패');
      }
    }
    catch (error) {
      console.error('Error sending email verification code:', error);
      alert('인증 코드 전송 중 오류가 발생했습니다.');
    }
  };
  //인증 코드 확인
  const handleVerifyCode = async () => {
    const emailInput = document.getElementById('email');
    const email = emailInput.value;
    try {
      // 서버에 인증 코드 검증 요청
      const response = await axiosInstance.post('/users/verify-email', {
        mail: email,
        verifyCode: authCode,
      });

      if (response.status === 200) {
        setAuthCodeError(false);
        setEmailDisabled(true);
        setEmailVerified(true);
        setTimer(0);
        alert('이메일 인증이 완료되었습니다.');
      } else {
        throw new Error('인증 실패');
      }
    } catch (error) {
      console.error('Error verifying email code:', error);
      setAuthCodeError(true);
      alert('인증 코드가 잘못되었습니다.');
    }
  };

  //아이디 중복 확인
  const handleCheckId = async () => {
    const idInput = document.getElementById('ID');
    const userId = idInput.value;

    if (!userId) {
      setIdError(true);
      setIdErrorMessage('ID를 입력해주세요.');
      return;
    }

    const idRegex = /^[a-zA-Z0-9]{4,}$/;
    if (!idRegex.test(userId)) {
      setIdError(true);
      setIdErrorMessage('4글자 이상, 영어 또는 숫자만 가능합니다.');
      return;
    }

    try {
      const response = await axiosInstance.get(`/users/check-id`, {
        params: { userId },
      });

      if (response.status === 201) {
        setIdError(false);
        setIdVerified(true);
        setIdErrorMessage('');
        setIdDisabled(true);
      }
      else {
        setIdError(true);
        setIdVerified(false);
        setIdErrorMessage('이미 사용 중인 ID입니다.');
      }
    } catch (error) {
      console.error('Error checking ID:', error);
      setIdError(true);
      setIdVerified(false);
      setIdErrorMessage('이미 사용 중인 ID입니다.');
    }
  };

  //비번 유효성 검사
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);

    const hasLetters_s = /[a-z]/.test(value);
    const hasLetters_b = /[A-Z]/.test(value);
    const hasNumbers = /\d/.test(value);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const validTypes = [hasLetters_s, hasLetters_b, hasNumbers, hasSpecialChars].filter(Boolean).length;

    if (value.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage('비밀번호는 8자 이상이어야 합니다.');
    } else if (validTypes < 2) {
      setPasswordError(true);
      setPasswordErrorMessage('비밀번호는 영어소문자, 영어대문자, 숫자, 특수문자 중 두 가지 유형 이상을 포함해야 합니다.');
    } else if (value.length >= 8 && validTypes >= 2) {
      setPasswordVerified(true);
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
  };
  //비번 재입력 확인
  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);

    // 비밀번호와 확인 비밀번호를 비교

    if (value !== password) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('');
      if ((passwordError === false) && (value === password)) {
        setPasswordDisabled(true); // 비밀번호와 확인 비밀번호가 일치하면 비밀번호 입력 필드를 비활성화
      }
    }
  };

  //사업자번호 확인
  const handleVerifybusinessNumber = async () => {
    const businessNumberInput = document.getElementById('co-num').value;

    if (!/^\d{10}$/.test(businessNumberInput)) {
      setBusinessNumberError(true);
      setBusinessNumberErrorMessage('사업자 번호는 10자리 숫자여야 합니다.');
      return;
    }

    try {
      const response = await axiosInstance.get('/api/business/verify', {
        params: { businessNumber: businessNumberInput },
      });

      if (response.status === 200) {
        const result = response.data.items[0];
        if (result.bstt === '계속사업자') {
          setIsBusinessNumberVerified(true);
          setBusinessNumberError(false);
          setBusinessNumberErrorMessage('');
          document.getElementById('co-name').value = result.company;
          setIsCompanyNameDisabled(true);
          alert('인증완료 : 유효한 사업자 번호입니다.');
        } else {
          setIsBusinessNumberVerified(false);
          setBusinessNumberError(true);
          setBusinessNumberErrorMessage('유효하지 않은 사업자 번호입니다.');
        }
      } else {
        alert('응답 데이터가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('사업자 번호 인증 오류:', error);
      alert('사업자 번호 인증 중 오류가 발생했습니다.');
    }
  };

  //마지막 유효성 검사
  const validateInputs = () => {
    const fields = {
      ID: { setter: setIdError, messageSetter: setIdErrorMessage },
      name: { setter: setNameError, messageSetter: setNameErrorMessage },
      email: { setter: setEmailError, messageSetter: setEmailErrorMessage },
      password: { setter: setPasswordError, messageSetter: setPasswordErrorMessage },
      confirmPassword: { setter: setConfirmPasswordError, messageSetter: setConfirmPasswordErrorMessage },
      'co-num': { setter: setBusinessNumberError, messageSetter: setBusinessNumberErrorMessage },
      'co-name': { setter: setBusinessNumberError, messageSetter: setBusinessNumberErrorMessage },
    };

    let isValid = true;
    Object.entries(fields).forEach(([id, { setter, messageSetter }]) => {
      const value = document.getElementById(id)?.value;
      if (!value) {
        setter(true);
        messageSetter('필수 입력 항목입니다.');
        isValid = false;
      } else {
        setter(false);
        messageSetter('');
      }
    });

    // 추가 유효성 검사
    const emailValue = document.getElementById('email')?.value;
    const idValue = document.getElementById('ID')?.value;
    const passwordValue = document.getElementById('password')?.value;
    const confirmPasswordValue = document.getElementById('confirmPassword')?.value;
    const coNumValue = document.getElementById('co-num')?.value;
    const coNameValue = document.getElementById('co-name')?.value;

    // 1. email 값이 있고, ID 값이 비어 있을 경우
    if (emailValue && !idValue) {
      setEmailError(true);
      setEmailErrorMessage('Email 인증을 하셔야 합니다.');
      isValid = false;
    }

    // 2. ID 값이 있고, password 값이 비어 있을 경우
    if (idValue && !passwordValue) {
      setIdError(true);
      setIdErrorMessage('ID 중복 인증을 하셔야 합니다.');
      isValid = false;
    }

    // 3. password 값이 있고, confirmPassword 값이 비어 있을 경우
    if (passwordValue && !confirmPasswordValue) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('Password를 한번 더 입력해주세요.');
      isValid = false;
    }

    // 4. co-num 값이 있고, co-name 값이 없을 경우
    if (coNumValue && !coNameValue) {
      setBusinessNumberError(true);
      setBusinessNumberErrorMessage('사업자 등록번호 인증을 하셔야 합니다.');
      isValid = false;
    }

    return isValid;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const userId = document.getElementById('ID').value;
    const userName = document.getElementById('name').value;
    const userEmail = document.getElementById('email').value;
    const userPwd = password;
    const enterpriseNum = document.getElementById('co-num').value;
    const enterpriseName = document.getElementById('co-name').value;

    try {
      const response = await axiosInstance.post(
        '/users/signup', {
        userId: userId,
        userName: userName,
        userPwd: userPwd,
        userEmail: userEmail,
        enterpriseNum: parseInt(enterpriseNum, 10),
        enterpriseName: enterpriseName,
      });

      if (response.status === 200 || response.status === 201) {
        alert('회원가입이 성공적으로 완료되었습니다!');
        window.location.href = '/sign-in';
      } else {
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
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
                value={name} // 상태와 연동
                onChange={handleNameChange} // 상태 업데이트 핸들러
                id="name"
                autoComplete="off"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
              />
            </FormControl>

            <Divider>
              <Typography sx={{ color: 'text.secondary' }}></Typography>
            </Divider>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Box display="flex" alignItems="center" gap={1} >
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
                  disabled={(name === "") || emailDisabled}
                  InputProps={{
                    endAdornment: emailDisabled && (
                      <InputAdornment position="end">
                        <TaskAltIcon color="blue" sx={{ fontSize: 17 }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleSendCode}

                  sx={{
                    minWidth: '90px',

                    pointerEvents: emailDisabled ? 'none' : 'auto', // 비활성화 상태에서 클릭 방지           
                  }}
                >
                  {emailDisabled
                    ? '인증완료'
                    : isCodeSent
                      ? '재전송'
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
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  error={authCodeError}
                  helperText={authCodeError ? '인증 코드가 일치하지 않습니다.' : ''}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography
                          variant="body2"
                          sx={{
                            color: timer > 0 ? 'text.secondary' : 'error.main',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {timer > 0
                            ? `${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}`
                            : '시간 초과'}
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleVerifyCode}
                  sx={{
                    marginTop: '10px', // 위쪽 마진 추가
                  }}
                >
                  확인
                </Button>
              </FormControl>
            )}

            <Divider>
              <Typography sx={{ color: 'text.secondary' }}></Typography>
            </Divider>

            <FormControl>
              <FormLabel htmlFor="ID">ID</FormLabel>
              <Box display="flex" alignItems="center" gap={1}>
                <TextField
                  required
                  fullWidth
                  name="ID"
                  placeholder="Your ID"
                  type="text"
                  id="ID"
                  autoComplete="off"
                  error={idError}
                  helperText={idErrorMessage}
                  disabled={idDisabled || !emailDisabled}

                  InputProps={{
                    endAdornment: idVerified && (
                      <InputAdornment position="end">
                        <TaskAltIcon color="blue" sx={{ fontSize: 17 }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleCheckId}
                  sx={{
                    minWidth: '90px',

                    pointerEvents: idDisabled ? 'none' : 'auto', // 비활성화 상태에서 클릭 방지      
                  }}

                >{idVerified ? '확인완료' : '중복확인'}</Button>
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
                disabled={passwordDisabled || !idDisabled}
                InputProps={{
                  endAdornment: passwordVerified && (
                    <InputAdornment position="end">
                      <TaskAltIcon color="blue" sx={{ fontSize: 17 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="confirm-password">PW확인</FormLabel>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                placeholder="••••••"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                error={confirmpasswordError}
                helperText={confirmpasswordErrorMessage}
                disabled={passwordDisabled || passwordError}
                InputProps={{
                  endAdornment: confirmPassword && password === confirmPassword && (
                    <InputAdornment position="end">
                      <TaskAltIcon color="blue" sx={{ fontSize: 17 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <Divider>
              <Typography sx={{ color: 'text.secondary' }}></Typography>
            </Divider>

            <FormControl>
              <FormLabel htmlFor="address">사업자번호</FormLabel>
              {/* 대표번호 */}
              <Box display="flex" alignItems="center" gap={1}>
                <TextField
                  required
                  fullWidth
                  name="co-num"
                  placeholder="대표번호"
                  id="co-num"
                  type="tel"
                  error={businessNumberError}
                  helperText={businessNumberErrorMessage}
                  disabled={!passwordDisabled}
                  InputProps={{
                    endAdornment: isBusinessNumberVerified && (
                      <InputAdornment position="end">
                        <TaskAltIcon color="blue" sx={{ fontSize: 17 }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleVerifybusinessNumber}
                  sx={{
                    minWidth: '90px',
                  }}
                >
                  인증확인
                </Button>
              </Box>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="address">회사명</FormLabel>
              {/* 회사명 */}
              <TextField
                required
                fullWidth
                name="co-name"
                id="co-name"
                placeholder="회사명"
                disabled={true}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
            >
              Sign up
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}