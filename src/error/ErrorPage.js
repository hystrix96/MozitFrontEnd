import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import { Container, Typography, Button, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorPage = ({ statusCode = 404, message = "페이지를 찾을 수 없습니다." }) => {
  const navigate = useNavigate();

  return (
    <AppTheme>
        <CssBaseline enableColorScheme />
        <Container 
        maxWidth="md" 
        sx={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "100vh", 
        }}
        >
        <Paper 
            elevation={6} 
            sx={{
            padding: 5,
            textAlign: "center",
            borderRadius: 3,
            width: { xs: "90%", md: "50%" }, // 반응형 크기 조절
            }}
        >
            <Box display="flex" flexDirection="column" alignItems="center">
            <ErrorOutlineIcon sx={{ fontSize: 80, color: "error.main", mb: 2 }} />
            <Typography variant="h2" color="error" gutterBottom>
                {statusCode}
            </Typography>
            <Typography variant="h5" gutterBottom>
                {message}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: "gray" }}>
                입력하신 주소를 다시 확인해주세요.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                홈으로 가기
            </Button>
            </Box>
        </Paper>
        </Container>
    </AppTheme>
  );
};

export default ErrorPage;