import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import Footer from '../components/Footer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MenuContent from '../dashboard/components/MenuContent'
import Header from '../dashboard/components/Header'
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import axiosInstance from '../api/axiosInstance';

export default function NoticeEditPage(props) {
  const { id } = useParams();  // URL에서 id 파라미터 추출
  const [notice, setNotice] = useState(null);  // 공지사항 상태
  const [title, setTitle] = useState(''); // 제목 상태 관리
  const [content, setContent] = useState(''); // 내용 상태 관리
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await axiosInstance.get(`/notices/${id}`); // API 호출로 공지사항 데이터 가져오기
        console.log('공지사항 데이터:', response.data); // 응답 데이터 확인
        setNotice(response.data);
        setTitle(response.data.noticeTitle); // API로 받은 제목을 상태에 설정
        setContent(response.data.noticeDetail); // API로 받은 내용 설정
      } catch (error) {
        console.error('공지사항을 가져오는 중 오류 발생:', error);
      }
    };
    fetchNotice();
  }, [id]);

  const handleSave = async () => {
    try {
      const updatedNotice = {
        noticeTitle: title,
        noticeDetail: content,
      };
      await axiosInstance.patch(`/notices/${id}`, updatedNotice);
      navigate(`/admin/notice/${id}`);
    } catch (error) {
      console.error('공지사항 수정 실패:', error);
    }
  };

  if (!notice) {
    return (
      <AppTheme>
        <Box sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom>
            공지사항을 찾을 수 없습니다.
          </Typography>
        </Box>
        <Footer />
      </AppTheme>
    );
  }

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
            공지사항 수정
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
                        onChange={(e) => setTitle(e.target.value)}
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
                    onChange={setContent}
                    style={{ height: '300px', marginBottom: '20px' }}
                />
            </Box>

            <Box sx={{ marginTop: 7, textAlign: 'right' }}>
                <Button
                variant="outlined"
                color="primary"
                sx={{ marginRight: 2 }}
                onClick={handleSave}
                >
                저장
                </Button>
                <Link to={`/admin/notice/${notice.noticeNum}`}>
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