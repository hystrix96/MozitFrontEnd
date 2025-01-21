import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, TextField } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import Footer from '../components/Footer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MenuContent from '../dashboard/components/MenuContent'
import Header from '../dashboard/components/Header'
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';

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

export default function NoticeDetailPage(props) {
  const { id } = useParams();  // URL에서 id 파라미터 추출
  const notice = notices.find((n) => n.id === parseInt(id));  // 해당 id의 공지사항 찾기
  const [title, setTitle] = useState(notice ? notice.title : ''); // 제목 상태 관리
  const [content, setContent] = useState(notice ? notice.description : ''); // 수정 가능한 내용 상태 관리

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
            공지사항 수정
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
                    <TextField
                        label="제목"
                        variant="standard"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{
                            width: '90%',         // 길이를 줄임 (전체 폭의 80%)
                            marginTop: -0.8,        // 위로 살짝 이동
                            marginBottom: 1,      // 아래 공간 추가
                            alignSelf: 'flex-start', // 왼쪽 정렬 (필요에 따라 조정)
                          }}
                    />
                </Box>
                <Typography variant="body1" sx={{ flex: 1, marginLeft: -2 }}>
                    작성일자: {notice.date}
                </Typography>
            </Box>

            <Box>
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    style={{ height: '300px', marginBottom: '20px' }}
                />
            </Box>

            <Box sx={{ marginTop: 7, textAlign: 'right' }}>
                <Button
                variant="outlined"
                color="primary"
                sx={{ marginRight: 2 }}
                >
                저장
                </Button>
                <Link to={`/noticelist/${notice.id}`}>
                    <Button variant="outlined" color="secondary">
                    취소
                    </Button>
                </Link>
            </Box>
        </Box>
          </Stack>
        </Box>
      </Box>
           </AppTheme>
  );
}