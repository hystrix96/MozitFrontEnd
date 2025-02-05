import React, { useState, useEffect }from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, Chip } from '@mui/material';
import MenuContent from '../dashboard/components/MenuContent'
import Header from '../dashboard/components/Header'
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import axiosInstance from '../api/axiosInstance';
import dayjs from 'dayjs';

export default function QuestionListPage(props) {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(0); // Current page number
  const [rowsPerPage, setRowsPerPage] = useState(10); // Number of rows per page

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axiosInstance.get('/questions'); // API 엔드포인트
      const sortedQuestions = response.data.sort((a, b) => b.questionNum - a.questionNum); // 번호 큰 것부터 정렬
      setQuestions(sortedQuestions); // 응답 데이터를 상태로 설정
    }
    fetchQuestions();
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
                        <TableCell align="left">문의일자</TableCell>
                        <TableCell align="left">상태</TableCell>
                        <TableCell align="center">상세보기</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Paginate the myquestions
                        .map((question, index) => (
                            <TableRow key={question.questionNum}>
                            <TableCell align="left">{questions.length - (page * rowsPerPage + index)}</TableCell>
                            <TableCell align="left">{question.userNum.userId}</TableCell>
                            <TableCell align="left">{getMessageByType(question.questionType)}</TableCell>
                            <TableCell align="left">{question.questionTitle}</TableCell>
                            <TableCell align="left">{dayjs(question.timestamp).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                            <TableCell align="left">
                                <Chip
                                    label={question.questionState ? '답변완료' : '미답변'}
                                    color={question.questionState ? 'success' : 'error'}
                                    sx={{ margin: 1 }} // 스타일 추가 (여기서는 간격을 설정)
                                />
                            </TableCell>
                            <TableCell align="center">
                                <Link to={`/admin/qna/${question.questionNum}`}>
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