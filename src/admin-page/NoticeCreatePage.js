import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MenuContent from '../dashboard/components/MenuContent'
import Header from '../dashboard/components/Header'
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import axiosInstance from '../api/axiosInstance';

export default function NoticeCreatePage(props) {
  const [title, setTitle] = useState('');  // 제목 상태
  const [content, setContent] = useState('');  // 내용 상태
  const navigate = useNavigate();  // 페이지 리다이렉션을 위한 useNavigate 훅

  // 제목 변경 핸들러
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // 내용 변경 핸들러
  const handleContentChange = (value) => {
    setContent(value);
  };

  // 공지사항 저장 함수
  const handleSave = async () => {
    const newNotice = {
      noticeTitle: title,
      noticeDetail: content,
    };

    try {
      await axiosInstance.post('/notices', newNotice);  // 공지사항 생성 API 호출
      navigate('/admin/notice');  // 공지사항 목록 페이지로 이동
    } catch (error) {
      console.error('공지사항 저장 중 오류 발생:', error);
    }
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
            spacing={2}
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
                        value={title}
                        onChange={handleTitleChange}
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
                    value={content}
                    onChange={handleContentChange}
                    style={{ height: '300px', marginBottom: '20px' }}
                />
            </Box>

            <Box sx={{ marginTop: 7, textAlign: 'right' }}>
                <Button
                variant="outlined"
                color="primary"
                onClick={handleSave}
                sx={{ marginRight: 2 }}
                >
                저장
                </Button>
                <Link to={'/admin/notice'}>
                    <Button variant="outlined" color="secondary">
                    취소
                    </Button>
                </Link>
            </Box>
        </Box>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}