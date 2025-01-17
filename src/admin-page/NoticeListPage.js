import React, { useState }from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import Footer from '../components/Footer';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button } from '@mui/material';


const notices = [
    {
      id: 1,
      title: '공지사항 제목 1',
      date: '2025-01-15',
      description: '공지사항 내용 1입니다. 자세한 내용을 보려면 클릭하세요.',
    },
    {
      id: 2,
      title: '공지사항 제목 2',
      date: '2025-01-14',
      description: '공지사항 내용 2입니다. 더 많은 내용을 보려면 읽어보세요.',
    },
    {
      id: 3,
      title: '공지사항 제목 3',
      date: '2025-01-13',
      description: '공지사항 내용 3입니다. 자세한 사항은 공지사항을 클릭하여 확인하세요.',
    },
    {
      id: 4,
      title: '공지사항 제목 4',
      date: '2025-01-12',
      description: '공지사항 내용 4입니다. 자세한 내용을 보려면 클릭하세요.',
    },
    {
      id: 5,
      title: '공지사항 제목 5',
      date: '2025-01-11',
      description: '공지사항 내용 5입니다. 더 많은 내용을 보려면 읽어보세요.',
    },
    {
      id: 6,
      title: '공지사항 제목 6',
      date: '2025-01-10',
      description: '공지사항 내용 6입니다. 자세한 사항은 공지사항을 클릭하여 확인하세요.',
    },
    {
        id: 7,
        title: '공지사항 제목 7',
        date: '2025-01-10',
        description: '공지사항 내용 7입니다. 자세한 사항은 공지사항을 클릭하여 확인하세요.',
    },
];


export default function NoticeListPage(props) {
  const [page, setPage] = useState(0); // Current page number
  const [rowsPerPage, setRowsPerPage] = useState(10); // Number of rows per page

  // Handle change of page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change of rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };

  const handleRowClick = (id) => {
    // 클릭한 행의 ID에 해당하는 상세 페이지로 이동
    window.location.href = `/noticelist/${id}`;
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
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
                    공지사항
                </Typography>
                
                <TableContainer component={Paper}>
                    <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell align="left">번호</TableCell>
                        <TableCell align="left">제목</TableCell>
                        <TableCell align="left">날짜</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notices
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Pagination
                            .map((notice, index) => (
                            <TableRow
                                key={notice.id}
                                hover
                                sx={{ cursor: 'pointer' }} // 클릭 시 커서 변경
                                onClick={() => handleRowClick(notice.id)} // 클릭 시 상세 페이지로 이동
                            >
                                <TableCell align="left">{index + 1 + page * rowsPerPage}</TableCell>
                                <TableCell align="left">{notice.title}</TableCell>
                                <TableCell align="left">{notice.date}</TableCell>
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