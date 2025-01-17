import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

export default function SitemarkIcon({ height = 30 }) {
   const theme = useTheme();
   const imageUrl = theme.palette.mode === 'dark' 
    ? '/assets/img/brand/mozit.png'  // 다크 모드일 때 이미지
    : '/assets/img/brand/mozit2.png'; // 라이트 모드일 때 이미지

  return (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
  <a href="/" style={{ textDecoration: 'none' }}>  {/* 경로를 /로 고정 */}
    <img
      src={imageUrl}  // public 폴더 기준 경로
      alt="Logo"
      style={{ height: `${height}px` }}  // height를 props로 설정
    />
  </a>

  </Box>
  );
}
