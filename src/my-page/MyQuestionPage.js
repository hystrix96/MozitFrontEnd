import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, Chip,CircularProgress } from '@mui/material';
import axiosInstance from '../api/axiosInstance';

export default function MyQuestionPage(props) {
  const [page, setPage] = useState(0); // Current page number
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page
  const [questions, setQuestions] = useState([]); // 질문 데이터
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  
  const fetchQuestions = async () => {
    try {
      const response = await axiosInstance.get('/questions/my');
      const sortedQuestions = response.data.sort((a, b) => b.questionNum - a.questionNum); // 번호 큰 것부터 정렬
      setQuestions(sortedQuestions); // 데이터 상태 설정
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };
  // 컴포넌트가 마운트될 때 데이터를 가져옵니다.
  useEffect(() => {
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
      <AppAppBar />
      <div>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            minHeight: 'calc(100vh - 64px)',
            padding: 4,
            marginTop: '80px',
          }}
        >
          <Box sx={{ maxWidth: 1000, width: '100%' }}>
            <Typography variant="h4" gutterBottom sx={{ marginBottom: 2 }}>
              내 문의
            </Typography>

            {/* 로딩 중 표시 */}
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">번호</TableCell>
                      <TableCell align="left">유형</TableCell>
                      <TableCell align="left">제목</TableCell>
                      <TableCell align="left">문의일자</TableCell>
                      <TableCell align="left">상태</TableCell>
                      <TableCell align="center">상세보기</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {questions
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((question, index) => (
                        <TableRow key={question.questionNum}>
                          <TableCell align="left">{questions.length - (page * rowsPerPage + index)}</TableCell>
                          <TableCell align="left">{getMessageByType(question.questionType)}</TableCell>
                          <TableCell align="left">{question.questionTitle || '제목 없음'}</TableCell>
                          <TableCell align="left">
                            {new Date(question.timestamp).toLocaleDateString()}
                          </TableCell>
                          <TableCell align="left">
                            <Chip
                              label={question.questionState ? '답변완료' : '미답변'}
                              color={question.questionState ? 'success' : 'error'}
                              sx={{ margin: 1 }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Link to={`/myquestion/${question.questionNum}`}>
                              <Button variant="outlined" color="primary">
                                보기
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

           <TablePagination
              rowsPerPageOptions={[]} // 이 부분을 수정하여 Rows per page 비활성화
              component="div"
              count={questions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
            />
          </Box>
        </Box>
        <Footer />
      </div>
    </AppTheme>
  );
}