import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, TextField } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import Footer from '../components/Footer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function NoticeCreatePage(props) {

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box 
        sx={{
            display: 'flex',
            flexDirection: 'column',  // 수직 방향으로 배치
            alignItems: 'center',
            justifyContent: 'flex-start', // 상단 정렬
            minHeight: 'calc(100vh - 64px)', // AppBar를 제외한 전체 높이
            padding: 4,
            marginTop: '64px', // AppBar를 위한 상단 여백
        }}
      >
        <Box sx={{
            maxWidth: 1000,
            width: '100%',
            }}
        >
            <Typography variant="h4" gutterBottom sx={{ marginBottom: 2 }}>
            공지사항 작성
            </Typography>
            <Box
                sx={{
                    maxWidth: 1000,
                    width: '100%',
                    padding: 1,
                    paddingLeft: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    marginBottom: 2,
                    display: 'flex', // 한 줄로 배치
                    flexDirection: 'row', // 가로 방향 배치
                    alignItems: 'center', // 수직 가운데 정렬
                    justifyContent: 'space-between', // 항목 간 간격 조정
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 4 }}>
                    <TextField
                        label="제목"
                        variant="standard"
                        fullWidth
                        sx={{
                            width: '90%',         // 길이를 줄임 (전체 폭의 80%)
                            marginTop: -0.8,        // 위로 살짝 이동
                            marginBottom: 1,      // 아래 공간 추가
                            alignSelf: 'flex-start', // 왼쪽 정렬 (필요에 따라 조정)
                          }}
                    />
                </Box>
            </Box>

            <Box>
                <ReactQuill
                    theme="snow"
                    style={{ height: '300px', marginBottom: '20px' }}
                />
            </Box>

            <Box sx={{ marginTop: 7, textAlign: 'right' }}>
                <Button
                variant="outlined"
                color="primary"
                sx={{ marginRight: 2 }}
                >
                저장
                </Button>
                <Link to={'/noticelist'}>
                    <Button variant="outlined" color="secondary">
                    취소
                    </Button>
                </Link>
            </Box>
        </Box>
      </Box>
   
    </AppTheme>
  );
}