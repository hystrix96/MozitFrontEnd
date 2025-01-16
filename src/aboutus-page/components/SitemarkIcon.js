import React from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom'; 

export default function SitemarkIcon({ height = 30 }) {
  return (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
  <a href="/" style={{ textDecoration: 'none' }}>  {/* 경로를 /로 고정 */}
    <img
      src="/assets/img/brand/mozit.png"  // public 폴더 기준 경로
      alt="Logo"
      style={{ height: `${height}px` }}  // height를 props로 설정
    />
  </a>

  </Box>
  );
}
