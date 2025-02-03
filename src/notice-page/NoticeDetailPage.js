import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import axiosInstance from '../api/axiosInstance';
import dayjs from 'dayjs';

export default function NoticeDetailPage(props) {
  const { id } = useParams();  // URL에서 id 파라미터 추출
  const [notice, setNotice] = useState(null); // 공지사항 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await axiosInstance.get(`/notices/${id}`); // API 호출
        setNotice(response.data); // 데이터 저장
      } catch (error) {
        console.error('공지사항 데이터를 가져오는 중 오류 발생:', error);
        setError('공지사항 데이터를 불러오는 중 문제가 발생했습니다.');
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };
    
    fetchNotice();
  }, [id]);

  if (loading) {
    return (
      <AppTheme>
        <AppAppBar />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100vh - 64px)',
          }}
        >
          <CircularProgress />
        </Box>
        <Footer />
      </AppTheme>
    );
  }

  if (error || !notice) {
    return (
      <AppTheme>
        <AppAppBar />
        <Box sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom>
            {error ? `오류 발생: ${error}` : '공지사항을 찾을 수 없습니다.'}
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/notice">
            공지사항 목록으로 돌아가기
          </Button>
        </Box>
        <Footer />
      </AppTheme>
    );
  }

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Box 
        sx={{
            display: 'flex',
            flexDirection: 'column',  // 수직 방향으로 배치
            alignItems: 'center',
            justifyContent: 'flex-start', // 상단 정렬
            minHeight: 'calc(100vh - 64px)', // AppBar를 제외한 전체 높이
            padding: 4,
            marginTop: '80px', // AppBar를 위한 상단 여백
        }}
      >
        <Box sx={{
            maxWidth: 1000,
            width: '100%',
            }}
        >
            <Typography variant="h4" gutterBottom sx={{ marginBottom: 2 }}>
            공지사항
            </Typography>
            {/* 공지사항 정보 */}
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

            {/* 목록으로 돌아가기 버튼 */}
            <Box sx={{ marginTop: 2, textAlign: 'right' }}>
                <Button variant="outlined" color="primary" component={Link} to="/notice">
                목록
                </Button>
            </Box>
        </Box>
      </Box>
      <Footer />
    </AppTheme>
  );
}