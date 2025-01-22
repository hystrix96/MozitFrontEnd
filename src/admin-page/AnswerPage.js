import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, TextField } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import MenuContent from '../dashboard/components/MenuContent'
import Header from '../dashboard/components/Header'
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import axiosInstance from '../api/axiosInstance';

export default function AnswerPage(props) {
  const { id } = useParams();  // URL에서 id 파라미터 추출
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/questions/${id}`)
      .then((response) => setQuestion(response.data))
      .catch((error) => console.error('데이터 로드 실패:', error));
  }, [id]);

  if (!question) {
    return (
      <AppTheme>
        <AppAppBar />
        <Box sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom>
            문의를 찾을 수 없습니다.
          </Typography>
        </Box>
        <Footer />
      </AppTheme>
    );
  }

  const handleAnswerSubmit = () => {
    if (!answer.trim()) {
      alert('답변을 입력해주세요.');
      return;
    }
    
    const data = {
      questionNum: question.questionNum, // questionNum을 추가
      timestamp: new Date().toISOString(),
      answerDetail: answer 
    };
  
    // 답변 저장 API 호출
    axiosInstance.post('/answer', data)
      .then(() => {
        alert('답변이 성공적으로 저장되었습니다.');
        window.location.reload(); // 새로고침
      })
      .catch((error) => console.error('답변 저장 실패:', error));

    navigate('/questionlist');
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
            문의 답변
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
                        {question.questionNum}
                    </Typography>
                    <Typography variant="h5">
                        {question.questionTitle}
                    </Typography>
                </Box>
                <Typography variant="body1" sx={{ flex: 1, marginLeft: -2 }}>
                    작성일자: {question.timestamp}
                </Typography>
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
                    height: 200,
                    maxHeight: 200, // 박스 최대 높이 고정
                    overflowY: 'auto', // 세로 스크롤 활성화
                }}
            >
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    {question.questionDetail}
                </Typography>
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
                    height: 200,
                    maxHeight: 200, // 박스 최대 높이 고정
                    overflowY: 'auto', // 세로 스크롤 활성화
                }}
            >
                {question.questionState ? <Typography variant="body1" sx={{ lineHeight: 1.8 }}>{question.answerResponse.answerDetail}</Typography> : 
                    <Box sx={{ marginTop: 2 }}>
                        <TextField
                            label="답변"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            sx={{ '& .MuiInputBase-root': {height: '100px', }, marginBottom: 2 }}
                        />
                    </Box>
                }
            </Box>

            <Box sx={{ marginTop: 2, textAlign: 'right' }}>
                {!question.questionState && (
                  <Button type="submit" variant="contained" color="primary" size="medium" onClick={handleAnswerSubmit} sx={{ marginRight: 2}}>
                  등록
                  </Button>
                )}
                <Button variant="outlined" color="primary" component={Link} to="/questionlist">
                목록
                </Button>
            </Box>
        </Box>
          </Stack>
        </Box>
      </Box>
           </AppTheme>
  );
}