import React, { useState }from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, Chip } from '@mui/material';


const myquestions = [
    {
      id: 1,
      title: '문의 제목 1',
      date: '2025-01-15',
      type: 'SERVICE',
      state: false,
      description: '문의 내용 1입니다. 자세한 내용을 보려면 클릭하세요.',
    },
    {
      id: 2,
      title: '문의 제목 2',
      date: '2025-01-14',
      type: 'SERVICE',
      state: false,
      description: '문의 내용 2입니다. 더 많은 내용을 보려면 읽어보세요.',
    },
    {
      id: 3,
      title: '문의 제목 3',
      date: '2025-01-13',
      type: 'ACCOUNT',
      state: true,
      description: '문의 내용 3입니다. 자세한 내용을 보려면 클릭하세요.',
    },
    {
      id: 4,
      title: '문의 제목 4',
      date: '2025-01-12',
      type: 'GENERAL',
      state: true,
      description: '문의 내용 4입니다. 자세한 내용을 보려면 클릭하세요.',
    },
    {
      id: 5,
      title: '문의 제목 5',
      date: '2025-01-11',
      type: 'ACCOUNT',
      state: false,
      description: '문의 내용 5입니다. 더 많은 내용을 보려면 읽어보세요.',
    },
    {
      id: 6,
      title: '문의 제목 6',
      date: '2025-01-10',
      type: 'ACCOUNT',
      state: true,
      description: '문의 내용 6입니다. 더 많은 내용을 보려면 읽어보세요.',
    },
    {
        id: 7,
        title: '문의 제목 7',
        date: '2025-01-10',
        type: 'SERVICE',
        state: true,
        description: '문의 내용 7입니다. 더 많은 내용을 보려면 읽어보세요.',
    },
];


export default function MyQuestionPage(props) {
  const [page, setPage] = useState(0); // Current page number
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page

  // Handle change of page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change of rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };

  const getMessageByType = (type) => {
    switch (type) {
      case 'SERVICE':
        return '제품 및 서비스';
      case 'ACCOUNT':
        return '계정 및 회원';
      case 'GENERAL':
        return '일반 문의';
      default:
        return '일반 문의';
    }
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
                    내 문의
                </Typography>
                
                <TableContainer component={Paper}>
                    <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell align="left">번호</TableCell>
                        <TableCell align="left">유형</TableCell>
                        <TableCell align="left">제목</TableCell>
                        <TableCell align="left">날짜</TableCell>
                        <TableCell align="left">상태</TableCell>
                        <TableCell align="center">상세보기</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myquestions
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Paginate the myquestions
                        .map((myquestion, index) => (
                            <TableRow key={myquestion.id}>
                            <TableCell align="left">{index + 1 + page * rowsPerPage}</TableCell>
                            <TableCell align="left">{getMessageByType(myquestion.type)}</TableCell>
                            <TableCell align="left">{myquestion.title}</TableCell>
                            <TableCell align="left">{myquestion.date}</TableCell>
                            <TableCell align="left">
                                <Chip
                                    label={myquestion.state ? '답변완료' : '미답변'}
                                    color={myquestion.state ? 'success' : 'error'}
                                    sx={{ margin: 1 }} // 스타일 추가 (여기서는 간격을 설정)
                                />
                            </TableCell>
                            <TableCell align="center">
                                <Link to={`/myquestion/${myquestion.id}`}>
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
                    count={myquestions.length} // Total number of notices
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