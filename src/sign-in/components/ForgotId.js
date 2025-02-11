import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField'; 
import axios from 'axios'

function ForgotPassword({ open, handleClose }) {
  const [step, setStep] = useState(1); // Step: 1 - Email, 2 - Verify Code, 3 - Reset Password
  const [userEmail, setuserEmail] = useState('');
  const [code, setCode] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [codeErrorMessage, setCodeErrorMessage] = useState('');

  const [emailSent, setEmailSent] = useState(false); 
  const [isCodeExpired, setIsCodeExpired] = useState(false);
  const [timer, setTimer] = useState(0); 

  const [Id, setId] = useState('');


  //이메일 인증 타이머 설정
  React.useEffect(() => {
    let interval;
    if (emailSent && timer > 0) {
      interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } 
    else if (timer === 0) {
      setIsCodeExpired(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [emailSent, timer]);

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handleBack = () => {
    setStep((prevStep) => {
      if (prevStep === 2) {
        setCode('');
        setEmailSent(false);
        setIsCodeExpired(false);
        setTimer(0);
        setCodeError(false);
        setCodeErrorMessage('');
      }
      return prevStep - 1;
    });
  };

  //이메일 존재 확인
  const checkEmail = async (userEmail) => {  
    try {
      const response = await axios.get('https://mozit-spring-leo8071004-e7b9gwh9cuayc2gf.koreacentral-01.azurewebsites.net/users/check-email', {
        params: { userEmail },
        validateStatus: (status) => {
          return status === 201 || status === 409;
        },
      });
      
        if (response.status === 201) {
          setEmailError(true);
          setEmailErrorMessage('존재하지 않는 이메일입니다.');
          return false;
        } else if(response.status === 409) {
          setEmailError(false);
          setEmailErrorMessage('');
          return true;
      }
    } catch (error) {
        console.error('이메일 중복 확인 중 오류 발생:', error);
        alert('이메일 중복 확인 중 오류가 발생했습니다.');
        return false;
    }
  };

  // 인증코드 전송
  const handleSendCode = async () => {
    const isEmailValid = await checkEmail(userEmail);
    if(isEmailValid){      
      try {
        const response = await axios.post('https://mozit-spring-leo8071004-e7b9gwh9cuayc2gf.koreacentral-01.azurewebsites.net/users/send-email', {
        mail: userEmail,
        });
      
        if (response.status === 200) {
          setEmailSent(true);
          setTimer(180); // 3분 타이머 설정
          setIsCodeExpired(false);
          alert('인증 코드가 이메일로 전송되었습니다.');
          handleNext();
        }
        else {
          setIsCodeExpired(false);
          setEmailSent(false);
          throw new Error('인증 코드 전송 실패');
        }}
        catch (error) {
          console.error('Error sending email verification code:', error);
          alert('인증 코드 전송 중 오류가 발생했습니다.');
        }
    }
  };

  //인증 코드 확인
  const handleVerifyCode = async () => {
    try {      
      // 코드 검증을 위한 백엔드 API 호출
      const response = await axios.post('https://mozit-spring-leo8071004-e7b9gwh9cuayc2gf.koreacentral-01.azurewebsites.net/users/verify-email', {
        mail: userEmail,
        verifyCode: code,
      },
      {
        withCredentials: true, 
      });

      if (response.status === 200) {
        setTimer(0);
        alert('이메일 인증이 완료되었습니다.');
        setCodeError(false);
        setCodeErrorMessage('');
        handleNext();
        findId();        
      } else {
        throw new Error('인증 실패');
      }
    } catch (error) {
      setCodeError(true);
      setCodeErrorMessage('유효하지 않은 인증코드입니다.');
      console.error('Error verifying code:', error);
    }
  };

  //아이디찾기기
  const findId = async () => {
    try {
      const response = await axios.post(
        'https://mozit-spring-leo8071004-e7b9gwh9cuayc2gf.koreacentral-01.azurewebsites.net/users/find-id',
        null, 
        {
            params: { email: userEmail }, 
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    
      if (response.status === 200) {
        setId(response.data);
        return true;
      }
    } catch (error) {
        console.error('아이디 찾기 중 오류 발생:', error);
        return false;
    }
  };

  // 다이얼로그 열 때마다 상태 초기화
  const handleDialogClose = () => {
    setStep(1);
    setuserEmail('');
    setCode('');
    setEmailSent(false);
    setIsCodeExpired(false);
    setEmailSent(false);
    setTimer(0);
    setId('');
    setEmailError(false);
    setEmailErrorMessage('');
    setCodeError(false);
    setCodeErrorMessage('');
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          if (step === 1) handleSendCode();
          else if (step === 2) handleVerifyCode();
        },
      }}
    >
      <DialogTitle>
        {step === 1 && '이메일 인증'}
        {step === 2 && '인증 코드 입력'}
        {step === 3 && '아이디 찾기'}
      </DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        {step === 1 && (
           <>
           <DialogContentText>
             회원님의 이메일을 입력해주세요. 인증코드가 전송됩니다.
           </DialogContentText>
           <TextField
             autoFocus
             required
             margin="dense"
             id="email"
             name="email"
             placeholder="이메일 입력"
             type="email"
             fullWidth
             value={userEmail}
             onChange={(e) => setuserEmail(e.target.value)}
             error={emailError} // 에러 상태 설정
             helperText={emailErrorMessage} // 에러 메시지 표시
           />
         </>
        )}
        {step === 2 && (
          <>
            <DialogContentText>
              인증코드가 {userEmail} 로 전송이 완료되었습니다.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="code"
              name="code"
              placeholder="인증코드 6자리"
              type="text"
              fullWidth
              value={code}
              onChange={(e) => setCode(e.target.value)}
              error={codeError}
              helperText={codeErrorMessage}
            />
          </>
        )}
        {step === 3 && (
          <>
            <DialogContentText>
              인증이 완료되었습니다. 회원님의 아이디는 다음과 같습니다.
            </DialogContentText>
            <Typography
              variant="h6"
              component="p"
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                mt: 2, // 위쪽 여백
                padding: '50px', // 패딩 추가
                borderRadius: '8px', // 둥근 테두리
                backgroundColor: 'rgba(0, 123, 255, 0.1)', // 배경 색
              }}
            >
              {Id}
            </Typography>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        {step > 1 && <Button onClick={handleBack}>Back</Button>}
        {step < 3 && <Button type="submit" variant="contained">Next</Button>}
        {step === 3 ? <Button onClick={handleDialogClose} variant="contained">Submit</Button>:
        <Button onClick={handleDialogClose}>Cancel</Button>}
      </DialogActions>
    </Dialog>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
