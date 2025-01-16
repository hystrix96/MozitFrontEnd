// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import OutlinedInput from '@mui/material/OutlinedInput';

// function ForgotPassword({ open, handleClose }) {
//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       PaperProps={{
//         component: 'form',
//         onSubmit: (event) => {
//           event.preventDefault();
//           handleClose();
//         },
//         sx: { backgroundImage: 'none' },
//       }}
//     >
//       <DialogTitle>Reset password</DialogTitle>
//       <DialogContent
//         sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
//       >
//         <DialogContentText>
//           Enter your account&apos;s email address, and we&apos;ll send you a link to
//           reset your password.
//         </DialogContentText>
//         <OutlinedInput
//           autoFocus
//           required
//           margin="dense"
//           id="email"
//           name="email"
//           label="Email address"
//           placeholder="Email address"
//           type="email"
//           fullWidth
//         />
//       </DialogContent>
//       <DialogActions sx={{ pb: 3, px: 3 }}>
//         <Button onClick={handleClose}>Cancel</Button>
//         <Button variant="contained" type="submit">
//           Continue
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// ForgotPassword.propTypes = {
//   handleClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
// };

// export default ForgotPassword;
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';

function ForgotPassword({ open, handleClose }) {
  const [step, setStep] = useState(1); // Step: 1 - Email, 2 - Verify Code, 3 - Reset Password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [emailSent, setEmailSent] = useState(false); // 상태를 추가하여 이메일 전송 여부 추적

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handleBack = () => setStep((prevStep) => prevStep - 1);

  const handleSendCode = async () => {
    try {
      // 백엔드로 이메일을 보내고 응답을 받는 부분
      const response = await fetch('/api/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const result = await response.json();
      if (result.success) {
        setEmailSent(true); // 이메일 전송 성공 시 상태 업데이트
        handleNext();
      } else {
        alert('Email not found, please try again.');
      }
    } catch (error) {
      console.error('Error sending code:', error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      // 코드 검증을 위한 백엔드 API 호출
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const result = await response.json();
      if (result.success) {
        handleNext();
      } else {
        alert('Invalid code, please try again.');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
    }
  };

  const handleResetPassword = async () => {
    try {
      // 비밀번호 리셋을 위한 백엔드 API 호출
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (result.success) {
        handleClose();
      } else {
        alert('Failed to reset password, please try again.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  // 다이얼로그 열 때마다 상태 초기화
  const handleDialogClose = () => {
    setStep(1);
    setEmail('');
    setCode('');
    setPassword('');
    setEmailSent(false);
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
          else if (step === 3) handleResetPassword();
        },
      }}
    >
      <DialogTitle>
        {step === 1 && 'Enter your email'}
        {step === 2 && 'Verify your code'}
        {step === 3 && 'Reset your password'}
      </DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        {step === 1 && (
          <>
            <DialogContentText>
              Enter your email address to receive a verification code.
            </DialogContentText>
            <OutlinedInput
              autoFocus
              required
              margin="dense"
              id="email"
              name="email"
              placeholder="Email address"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}
        {step === 2 && (
          <>
            <DialogContentText>
              Enter the verification code sent to {email}.
            </DialogContentText>
            <OutlinedInput
              autoFocus
              required
              margin="dense"
              id="code"
              name="code"
              placeholder="Verification code"
              type="text"
              fullWidth
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </>
        )}
        {step === 3 && (
          <>
            <DialogContentText>
              Enter your new password to reset your account password.
            </DialogContentText>
            <OutlinedInput
              autoFocus
              required
              margin="dense"
              id="password"
              name="password"
              placeholder="New password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        {step > 1 && <Button onClick={handleBack}>Back</Button>}
        {step < 3 && <Button type="submit" variant="contained">Next</Button>}
        {step === 3 && <Button type="submit" variant="contained">Submit</Button>}
        <Button onClick={handleDialogClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
