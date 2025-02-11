import React, { useState, useEffect }from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, Chip } from '@mui/material';
import axiosInstance from '../api/axiosInstance';
import dayjs from 'dayjs';

export default function MyWorkPage(props) {
  const [myworks, setMyWorks] = useState([]);
  const [page, setPage] = useState(0); // Current page number
  const [rowsPerPage, setRowsPerPage] = useState(3); // Number of rows per page

  const fetchMyWorks = async () => {
    try {
      const response = await axiosInstance.get('/edit'); // API 엔드포인트 호출
      const data = Array.isArray(response.data) ? response.data : [];
      const sortedData = data.sort((a, b) => b.editNum - a.editNum); // 번호 큰 것부터 정렬
      setMyWorks(sortedData);
    } catch (error) {
      console.error('작업 데이터를 가져오는 중 오류 발생:', error);
      setMyWorks([]);
    }
  };

  useEffect(() => {
    fetchMyWorks();
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
                    내 작업 결과
                </Typography>
                
                <TableContainer component={Paper}>
                    <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell align="left">번호</TableCell>
                        <TableCell align="left">썸네일</TableCell>
                        <TableCell align="left">제목</TableCell>
                        <TableCell align="left">작업일자</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myworks
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((mywork, index) => (
                            <TableRow key={mywork.editNum}>
                            <TableCell align="left">{myworks.length - (page * rowsPerPage + index)}</TableCell>
                            <TableCell align="left"><img src={mywork.thumbnail} height='100px' weight='200px'/></TableCell>
                            <TableCell align="left">{mywork.editTitle}</TableCell>
                            <TableCell align="left">{dayjs(mywork.timestamp).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[]} // Options for how many rows per page
                    component="div"
                    count={myworks.length} // Total number of notices
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