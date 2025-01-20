import React, { useState }from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, Chip } from '@mui/material';


const myworks = [
    {
      id: 1,
      title: '작업 제목 1',
      date: '2025-01-15',
      thumbnail: 'https://i.imgur.com/FEpJSS8.jpeg'
    },
    {
      id: 2,
      title: '작업 제목 2',
      date: '2025-01-14',
      thumbnail: 'https://i.imgur.com/FEpJSS8.jpeg'
    },
    {
      id: 3,
      title: '작업 제목 3',
      date: '2025-01-13',
      thumbnail: 'https://i.imgur.com/FEpJSS8.jpeg'
    },
    {
      id: 4,
      title: '작업 제목 4',
      date: '2025-01-12',
      thumbnail: 'https://i.imgur.com/FEpJSS8.jpeg'
    },
    {
      id: 5,
      title: '작업 제목 5',
      date: '2025-01-11',
      thumbnail: 'https://i.imgur.com/FEpJSS8.jpeg'
    },
    {
      id: 6,
      title: '작업 제목 6',
      date: '2025-01-10',
      thumbnail: 'https://i.imgur.com/FEpJSS8.jpeg'
    },
    {
        id: 7,
        title: '작업 제목 7',
        date: '2025-01-10',
        thumbnail: 'https://i.imgur.com/FEpJSS8.jpeg'
    },
];


export default function MyWorkPage(props) {
  const [page, setPage] = useState(0); // Current page number
  const [rowsPerPage, setRowsPerPage] = useState(3); // Number of rows per page

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
                marginTop: '64px', // AppBar를 위한 상단 여백
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
                        <TableCell align="left">날짜</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myworks
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((mywork, index) => (
                            <TableRow key={mywork.id}>
                            <TableCell align="left">{index + 1 + page * rowsPerPage}</TableCell>
                            <TableCell align="left"><img src={mywork.thumbnail} height='100px' weight='200px'/></TableCell>
                            <TableCell align="left">{mywork.title}</TableCell>
                            <TableCell align="left">{mywork.date}</TableCell>
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