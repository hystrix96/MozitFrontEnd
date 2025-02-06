import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Modal } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import axiosInstance from '../api/axiosInstance';
import { Link } from 'react-router-dom';


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
            marginTop: '80px', // AppBar를 위한 상단 여백
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
                    <Button variant="text" onClick={openModal} sx={{ marginTop: 1, color: 'primary.main' }}>
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
        open={isModalOpen}
        onClose={closeModal}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 450,
            height: 450,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h3
            style={{
              width: '100%',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              marginBottom: '10px',
            }}
          >
            이미지 상세
          </h3>
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt="Inquiry Image" 
              style={{ 
                width: '100%', // 너비를 부모 크기에 맞춤
                maxHeight: '75%', // 높이를 제한하여 텍스트 공간 확보
                objectFit: 'contain', // contain 대신 cover 유지
                borderRadius: '5px',
                flexGrow: 1, // 이미지가 적절한 크기로 조정되도록 함
              }} 
            />
          ) : (
            <p>이미지를 로드할 수 없습니다.</p>
          )}
          <Button onClick={closeModal} style={{ marginTop: '10px', marginBottom: '10px' }}>닫기</Button>
          </Box>
      </Modal>
    </AppTheme>
  );
}