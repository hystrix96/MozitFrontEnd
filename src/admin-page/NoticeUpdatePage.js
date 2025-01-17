import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';

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

export default function NoticeUpdatePage(props) {
  const { id } = useParams();  // URL에서 id 파라미터 추출
  const notice = notices.find((n) => n.id === parseInt(id));  // 해당 id의 공지사항 찾기

  if (!notice) {
    return (
      <AppTheme>
        <Box sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom>
            공지사항을 찾을 수 없습니다.
          </Typography>
        </Box>
        <Footer />
      </AppTheme>
    );
  }

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
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
                        {notice.id}
                    </Typography>
                    <Typography variant="h5">
                        {notice.title}
                    </Typography>
                </Box>
                <Typography variant="body1" sx={{ flex: 1, marginLeft: -2 }}>
                    작성일자: {notice.date}
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
                    height: 350,
                    maxHeight: 350, // 박스 최대 높이 고정
                    overflowY: 'auto', // 세로 스크롤 활성화
                }}
            >
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    {notice.description}
                </Typography>
            </Box>

            <Box sx={{ marginTop: 2, textAlign: 'right' }}>
                <Button variant="outlined" color="primary" component={Link} to="/noticelist" sx={{marginRight: 2}}>
                목록
                </Button>
                <Link to={`/noticelist/${notice.id}/edit`}>
                    <Button variant="outlined" color="primary" sx={{marginRight: 2}}>
                    수정
                    </Button>
                </Link>
                <Button variant="outlined" color="secondary">
                삭제
                </Button>
            </Box>
        </Box>
      </Box>
      <Footer />
    </AppTheme>
  );
}