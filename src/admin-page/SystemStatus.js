import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Typography, CircularProgress, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import MenuContent from '../dashboard/components/MenuContent'
import Header from '../dashboard/components/Header'
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import ErrorBoundary from '../dashboard/components/ErrorBoundary';
import ErrorIcon from '@mui/icons-material/Error';
import SideMenu from '../dashboard/components/SideMenu';

import Copyright from '../dashboard/internals/components/Copyright';
import ChartUserByCountry from '../dashboard/components/ChartUserByCountry';
import CustomizedDataGrid from '../dashboard/components/CustomizedDataGrid';
import CustomizedTreeView from '../dashboard/components/CustomizedTreeView';

export default function SystemStatus(props) {

  const [systemStatus, setSystemStatus] = useState(null); // 시스템 상태 데이터 저장
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리

  // Azure에서 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://your-azure-api-endpoint/system-status'); // Azure API 엔드포인트
        if (!response.ok) {
          throw new Error('Failed to fetch system status');
        }
        const data = await response.json();
        setSystemStatus(data); // 데이터 저장
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 로딩 상태 처리
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  // 데이터 정의
  const data = {
    rows: [
      { id: 1, name: 'GPU 모델', value: systemStatus?.gpu?.model },
      { id: 2, name: 'GPU 온도', value: `${systemStatus?.gpu?.temperature}°C` },
      { id: 3, name: 'GPU 사용량', value: `${systemStatus?.gpu?.usage}%` },
      { id: 4, name: 'GPU 메모리 점유율', value: `${systemStatus?.gpu?.memoryUsage}%` },
      { id: 5, name: '전체 메모리 용량', value: `${systemStatus?.memory?.total} GB` },
      { id: 6, name: '메모리 사용 중', value: `${systemStatus?.memory?.used} GB` },
      { id: 7, name: '메모리 사용률', value: `${systemStatus?.memory?.usage}%` },
    ],
    columns: [
      { field: 'name', headerName: '항목', flex: 1 },
      { field: 'value', headerName: '값', flex: 1 },
    ],
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {/* Sidebar (MenuContent) */}
        {/* <MenuContent /> */}
        <SideMenu />

        {/* 오른쪽 영역 */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Header
            sx={{
              width: '100%',
              zIndex: 10,
              position: 'sticky', // 스크롤 시 상단 고정
              top: 0,
            }}
          />
          {/* Main Content */}
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
            {/* 제목 섹션 */}
            <Typography
              variant="h4"
              sx={{
                mb: 4, // 제목 하단 여백
                fontWeight: 'bold',
                textAlign: 'left', // 좌측 정렬
                pl: 3, // 좌측 여백
                pt: 3, // 상단 여백
              }}
            >
              시스템 상태
            </Typography>

            <Stack
              spacing={3}
              sx={{
                alignItems: 'center',
                width: '100%',
                maxWidth: { sm: '100%', md: '1700px' },
                mx: 'auto',
                px: 2,
                flexGrow: 1, // 콘텐츠가 위로 확장되도록 설정
              }}
            >
              {/* 카드 그리드 */}
              <Box
                sx={{
                  width: '100%',
                  maxWidth: { sm: '100%', md: '1700px' },
                  mx: 'auto',
                  px: 2,
                }}
              >
                <Grid
                  container
                  spacing={3} // 카드 간의 간격 설정
                  justifyContent="center" // 중앙 정렬
                  alignItems="center" // 수직 정렬 (세로축 정렬)
                >
                  {/* GPU 정보 카드 */}
                  <Grid item xs={12} sm={6} md={6}>
                    <Card
                      sx={{
                        backgroundColor: '#f0f4ff',
                        boxShadow: 2,
                        borderRadius: 3,
                        height: '300px', // 고정 높이 설정
                        width: '35vw',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {error ? (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                          }}
                        >
                          <ErrorIcon color="error" sx={{ mr: 1 }} />
                          <Typography color="error">데이터 로딩 실패</Typography>
                        </Box>
                      ) : (
                        <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            GPU 정보
                          </Typography>
                          <Typography variant="body1">모델명: {systemStatus?.gpu?.model}</Typography>
                          <Typography variant="body1">온도: {systemStatus?.gpu?.temperature}°C</Typography>
                          <Typography variant="body1">사용량: {systemStatus?.gpu?.usage}%</Typography>
                          <Typography variant="body1">메모리 점유율: {systemStatus?.gpu?.memoryUsage}%</Typography>
                        </CardContent>
                      )}
                    </Card>
                  </Grid>

                  {/* 메모리 상태 카드 */}
                  <Grid item xs={12} sm={6} md={6}>
                    <Card
                      sx={{
                        backgroundColor: '#fff7e6',
                        boxShadow: 2,
                        borderRadius: 3,
                        height: '300px', // 고정 높이 설정
                        width: '35vw',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {error ? (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                          }}
                        >
                          <ErrorIcon color="error" sx={{ mr: 1 }} />
                          <Typography color="error">데이터 로딩 실패</Typography>
                        </Box>
                      ) : (
                        <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            메모리 상태
                          </Typography>
                          <Typography variant="body1">전체 용량: {systemStatus?.memory?.total} GB</Typography>
                          <Typography variant="body1">사용 중: {systemStatus?.memory?.used} GB</Typography>
                          <Typography variant="body1">사용률: {systemStatus?.memory?.usage}%</Typography>
                        </CardContent>
                      )}
                    </Card>
                  </Grid>
                </Grid>
              </Box>

              {/* 푸터 */}
              <Box sx={{ mt: 'auto', py: 2 }}>
                <Copyright />
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </AppTheme>
  );
}