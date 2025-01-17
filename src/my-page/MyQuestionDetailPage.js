import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';

const myquestions = [
    {
      id: 1,
      title: '문의 제목 1',
      date: '2025-01-15',
      state: false,
      type: 'SERVICE',
      description: '문의 내용 1입니다. 자세한 내용을 보려면 클릭하세요.',
      answerResponse: null
    },
    {
      id: 2,
      title: '문의 제목 2',
      date: '2025-01-14',
      state: false,
      type: 'GENERAL',
      description: '문의 내용 2입니다. 더 많은 내용을 보려면 읽어보세요.',
      answerResponse: null
    },
    {
      id: 3,
      title: '문의 제목 3',
      date: '2025-01-13',
      state: true,
      type: 'SERVICE',
      description: '문의 내용 3입니다. 자세한 내용을 보려면 클릭하세요.',
      answerResponse: {
        timestamp: '2025-01-15',
        answerDetail: '답변 내용 3'
        }
    },
    {
      id: 4,
      title: '문의 제목 4',
      date: '2025-01-12',
      state: true,
      type: 'ACCOUNT',
      description: '문의 내용 4입니다. 자세한 내용을 보려면 클릭하세요.',
      answerResponse: {
            timestamp: '2025-01-15',
            answerDetail: '답변 내용 4'
        }
    },
    {
      id: 5,
      title: '문의 제목 5',
      date: '2025-01-11',
      state: false,
      type: 'GENERAL',
      description: '문의 내용 5입니다. 더 많은 내용을 보려면 읽어보세요.',
      answerResponse: null
    },
    {
      id: 6,
      title: '문의 제목 6',
      date: '2025-01-10',
      state: true,
      type: 'SERVICE',
      description: '문의 내용 6입니다. 더 많은 내용을 보려면 읽어보세요.',
      answerResponse: {
        timestamp: '2025-01-15',
        answerDetail: '답변 내용 6'
        }
    },
    {
        id: 7,
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
];

export default function MyQuestionDetailPage(props) {
  const { id } = useParams();  // URL에서 id 파라미터 추출
  const myquestion = myquestions.find((n) => n.id === parseInt(id));  // 해당 id의 공지사항 찾기

  if (!myquestion) {
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
            <Typography variant="h4" gutterBottom sx={{ marginBottom: 2 }}>
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
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                        {myquestion.id}
                    </Typography>
                    <Typography variant="h5">
                        {myquestion.title}
                    </Typography>
                </Box>
                <Typography variant="body1" sx={{ flex: 1, marginLeft: -2 }}>
                    작성일자: {myquestion.date}
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
                    {myquestion.description}
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
                    {myquestion.state ? myquestion.answerResponse.answerDetail : '괜찮아 딩딩딩딩딩 딩딩딩딩딩'}
                </Typography>
            </Box>

            {/* 목록으로 돌아가기 버튼 */}
            <Box sx={{ marginTop: 2, textAlign: 'right' }}>
                <Button variant="outlined" color="primary" component={Link} to="/myquestion">
                목록
                </Button>
            </Box>
        </Box>
      </Box>
      <Footer />
    </AppTheme>
  );
}