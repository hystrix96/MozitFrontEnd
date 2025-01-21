import React, { useState }from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, Chip } from '@mui/material';
import MenuContent from '../dashboard/components/MenuContent'
import Header from '../dashboard/components/Header'
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';


const questions = [
    {
      id: 1,
      username: '정연주',
      title: '문의 제목 1',
      date: '2025-01-15',
      type: 'SERVICE',
      state: false,
      description: '문의 내용 1입니다. 자세한 내용을 보려면 클릭하세요.',
    },
    {
      id: 2,
      username: '고정우',
      title: '문의 제목 2',
      date: '2025-01-14',
      type: 'SERVICE',
      state: false,
      description: '문의 내용 2입니다. 더 많은 내용을 보려면 읽어보세요.',
    },
    {
      id: 3,
      username: '강민아',
      title: '문의 제목 3',
      date: '2025-01-13',
      type: 'ACCOUNT',
      state: true,
      description: '문의 내용 3입니다. 자세한 내용을 보려면 클릭하세요.',
    },
    {
      id: 4,
      username: '이세훈',
      title: '문의 제목 4',
      date: '2025-01-12',
      type: 'GENERAL',
      state: true,
      description: '문의 내용 4입니다. 자세한 내용을 보려면 클릭하세요.',
    },
    {
      id: 5,
      username: '민지영',
      title: '문의 제목 5',
      date: '2025-01-11',
      type: 'ACCOUNT',
      state: false,
      description: '문의 내용 5입니다. 더 많은 내용을 보려면 읽어보세요.',
    },
    {
      id: 6,
      username: '서윤호',
      title: '문의 제목 6',
      date: '2025-01-10',
      type: 'ACCOUNT',
      state: true,
      description: '문의 내용 6입니다. 더 많은 내용을 보려면 읽어보세요.',
    },
    {
        id: 7,
        username: '이지현',
        title: '문의 제목 7',
        date: '2025-01-10',
        type: 'GENERAL',
        state: true,
        description: '문의 내용 7입니다. 더 많은 내용을 보려면 읽어보세요.',
    },
    {
        id: 8,
        username: '강민아',
        title: '문의 제목 7',
        date: '2025-01-10',
        state: true,
        type: 'SERVICE',
        description: '문의 내용 7입니다. 더 많은 내용을 보려면 읽어보세요.',
        answerResponse: {
            timestamp: '2025-01-15',
            answerDetail: '답변 내용 7'
        }
    },
     {
        id: 9,
        username: '강민아',
        title: '문의 제목 7',
        date: '2025-01-10',
        state: true,
        type: 'SERVICE',
        description: '문의 내용 7입니다. 더 많은 내용을 보려면 읽어보세요.',
        answerResponse: {
            timestamp: '2025-01-15',
            answerDetail: '답변 내용 7'
        }
    },
     {
        id: 10,
        username: '강민아',
        title: '문의 제목 7',
        date: '2025-01-10',
        state: true,
        type: 'SERVICE',
        description: '문의 내용 7입니다. 더 많은 내용을 보려면 읽어보세요.',
        answerResponse: {
            timestamp: '2025-01-15',
            answerDetail: '답변 내용 7'
        }
    }
];


export default function QuestionListPage(props) {
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
                    문의 목록
                </Typography>
                
                <TableContainer component={Paper}>
                    <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell align="left">번호</TableCell>
                        <TableCell align="left">이름</TableCell>
                        <TableCell align="left">유형</TableCell>
                        <TableCell align="left">제목</TableCell>
                        <TableCell align="left">날짜</TableCell>
                        <TableCell align="left">상태</TableCell>
                        <TableCell align="center">상세보기</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Paginate the myquestions
                        .map((question, index) => (
                            <TableRow key={question.id}>
                            <TableCell align="left">{index + 1 + page * rowsPerPage}</TableCell>
                            <TableCell align="left">{question.username}</TableCell>
                            <TableCell align="left">{getMessageByType(question.type)}</TableCell>
                            <TableCell align="left">{question.title}</TableCell>
                            <TableCell align="left">{question.date}</TableCell>
                            <TableCell align="left">
                                <Chip
                                    label={question.state ? '답변완료' : '미답변'}
                                    color={question.state ? 'success' : 'error'}
                                    sx={{ margin: 1 }} // 스타일 추가 (여기서는 간격을 설정)
                                />
                            </TableCell>
                            <TableCell align="center">
                                <Link to={`/questionlist/${question.id}`}>
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
                    count={questions.length} // Total number of notices
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
          </Stack>
        </Box>
      </Box>
           </AppTheme>
  );
}