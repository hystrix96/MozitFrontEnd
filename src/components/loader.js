import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // 화면 전체 중앙
      backgroundColor: '#f5f5f5', // 배경 색상 설정
    }}
  >
    <CircularProgress size={50} thickness={4.5} />
  </Box>
);

export default Loader;