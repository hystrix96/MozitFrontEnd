import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import Footer from '../components/Footer';
import MenuContent from '../dashboard/components/MenuContent'
import Header from '../dashboard/components/Header'
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import axiosInstance from '../api/axiosInstance';
import dayjs from 'dayjs';

export default function NoticeUpdatePage(props) {
  const { id } = useParams();  // URL에서 id 파라미터 추출
  const [notice, setNotice] = useState(null); // 공지사항 데이터
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotice = async () => {
      const response = await axiosInstance.get(`/notices/${id}`); // API 호출
      setNotice(response.data); // 데이터 저장
    };
    fetchNotice();
  }, [id]);

  const deleteNotice = async () => {
    try {
      await axiosInstance.delete(`/notices/${id}`); // 공지사항 삭제 API 호출
      navigate('/admin/notice'); // 삭제 후 목록 페이지로 리다이렉트
    } catch (error) {
      console.error('공지사항 삭제 중 오류 발생:', error);
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
            공지사항
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
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                        {notice.noticeNum}
                    </Typography>
                    <Typography variant="h5">
                        {notice.noticeTitle}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flex: 3, justifyContent: 'flex-end', gap: 2 }}>
                    <Typography variant="body1">
                        작성일자: {dayjs(notice.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                    </Typography>
                    {notice.updatedAt && (
                      <Typography variant="body1">
                          수정일자: {dayjs(notice.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
                      </Typography>
                    )}
                </Box>
            </Box>

            <Box
                sx={{
                    maxWidth: 1000,
                    width: '100%',
                    padding: 4,
                    boxShadow: 2,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    marginTop: 2, // 제목 박스와 간격 추가
                    height: 350,
                    maxHeight: 350, // 박스 최대 높이 고정
                    overflowY: 'auto', // 세로 스크롤 활성화
                }}
            >
                <div
                  dangerouslySetInnerHTML={{
                    __html: notice.noticeDetail,
                  }}
                />
            </Box>

            <Box sx={{ marginTop: 2, textAlign: 'right' }}>
                <Button variant="outlined" color="primary" component={Link} to="/admin/notice" sx={{marginRight: 2}}>
                목록
                </Button>
                <Link to={`/admin/notice/${notice.noticeNum}/edit`}>
                    <Button variant="outlined" color="primary" sx={{marginRight: 2}}>
                    수정
                    </Button>
                </Link>
                <Button variant="outlined" color="secondary" onClick={deleteNotice}>
                삭제
                </Button>
            </Box>
        </Box>
          </Stack>
        </Box>
      </Box>
           </AppTheme>
  );
}