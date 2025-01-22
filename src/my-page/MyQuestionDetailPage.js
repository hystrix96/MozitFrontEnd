import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import axiosInstance from '../api/axiosInstance';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';


export default function MyQuestionDetailPage(props) {
  const { id } = useParams(); // URL에서 id 파라미터 추출
  const [question, setQuestion] = useState(null); // 질문 데이터 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  // 질문 세부사항을 가져오는 함수
  const fetchQuestionDetail = async () => {
    try {
      const response = await axiosInstance.get(`/questions/${id}`);
      setQuestion(response.data); // 받아온 데이터를 상태에 설정
      setImageUrl(response.data.questionImage);
    } catch (error) {
      console.error('Error fetching question detail:', error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  useEffect(() => {
    fetchQuestionDetail(); // 컴포넌트 마운트 시 세부 질문 가져오기
  }, [id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <AppTheme>
        <AppAppBar />
        <Box sx={{ padding: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
        <Footer />
      </AppTheme>
    );
  }

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
            <Typography variant="h4" gutterBottom>
          내 문의 
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
                   <Typography variant="h5">{question.questionTitle}</Typography>
                </Box>
                <Typography variant="body1" color="textSecondary" sx={{ display: 'flex', flexDirection: 'column' }}>
                  {getMessageByType(question.questionType)} | 문의일자: {new Date(question.timestamp).toLocaleDateString()}
                  
                  {imageUrl && (
                    <Button variant="text" onClick={openModal} sx={{ marginTop: 1 }}>
                      이미지 보기
                    </Button>
                  )}
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
             {question.answerResponse ? (
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
            <Typography variant="h6">답변</Typography>
            <Typography variant="body1">{question.answerResponse.answerDetail}</Typography>
            <Typography variant="body2" color="textSecondary">
              답변일자: {new Date(question.answerResponse.timestamp).toLocaleDateString()}
            </Typography>
          </Box>
        ) : (
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
            <Typography variant="body1" color="textSecondary">
              아직 답변이 없습니다.
            </Typography>
          </Box>
        )}


            {/* 목록으로 돌아가기 버튼 */}
            <Box sx={{ marginTop: 2, textAlign: 'right' }}>
                <Button variant="outlined" color="primary" component={Link} to="/myquestion">
                목록
                </Button>
            </Box>
        </Box>
      </Box>
      <Footer />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경 어둡게
          },
          content: {
            width: '400px', // 모달 너비
            height: '400px', // 모달 높이
            margin: 'auto', // 화면 중앙 정렬
            borderRadius: '10px', // 둥근 모서리
            padding: '20px', // 내부 여백
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          },
        }}
      >
        <h3>이미지 상세</h3>
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Inquiry Image" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '100%', 
              objectFit: 'contain', 
              objectFit: 'cover',
              borderRadius: '5px',
            }} 
          />
        ) : (
          <p>이미지를 로드할 수 없습니다.</p>
        )}
        <Button onClick={closeModal} style={{ marginTop: '10px' }}>닫기</Button>
      </Modal>
    </AppTheme>
  );
}