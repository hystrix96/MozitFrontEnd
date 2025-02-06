import React, { useState, useEffect }from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, CircularProgress } from '@mui/material';
import axiosInstance from '../api/axiosInstance';
import dayjs from 'dayjs';

export default function NoticePage(props) {
  const [notices, setNotices] = useState([]); // 공지사항 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [page, setPage] = useState(0); // Current page number
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page

  const fetchNotices = async () => {
    try {
      const response = await axiosInstance.get('/notices'); // API 호출
      const sortedNotices = response.data.sort((a, b) => b.noticeNum - a.noticeNum); // 번호 큰 것부터 정렬
      setNotices(sortedNotices);
      setLoading(false); // 로딩 종료
    } catch (error) {
      console.error('공지사항 데이터를 가져오는 중 오류 발생:', error);
      setError('공지사항 데이터를 불러오는 중 문제가 발생했습니다.');
      setLoading(false); // 로딩 종료
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // Handle change of page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change of rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };

  if (loading) {
    return (
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <AppAppBar />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      </AppTheme>
    );
  }

  if (error) {
    return (
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <AppAppBar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      </AppTheme>
    );
  }

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <div>
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
                
                <TableContainer component={Paper}>
                    <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell align="left">번호</TableCell>
                        <TableCell align="left">제목</TableCell>
                        <TableCell align="left">작성일자</TableCell>
                        <TableCell align="center">상세보기</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notices
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Paginate the notices
                        .map((notice, index) => (
                            <TableRow key={notice.noticeNum}>
                            <TableCell align="left">{notices.length - (page * rowsPerPage + index)}</TableCell>
                            <TableCell align="left">{notice.noticeTitle}</TableCell>
                            <TableCell align="left">{dayjs(notice.createdAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                            <TableCell align="center">
                                <Link to={`/notice/${notice.noticeNum}`}>
                                    <Button 
                                    variant="outlined" 
                                    color="primary" 
                                    >
                                    보기
                                    </Button>
                                </Link>
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[]} // Options for how many rows per page
                    component="div"
                    count={notices.length} // Total number of notices
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Box>
        <Footer />
      </div>
    </AppTheme>
  );
}