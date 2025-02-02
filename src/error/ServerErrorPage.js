import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import { Container, Typography, Button, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ServerErrorPage = () => {
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
            width: { xs: "90%", md: "50%" },
          }}
        >
            <Box display="flex" flexDirection="column" alignItems="center">
                <ErrorOutlineIcon sx={{ fontSize: 80, color: "error.main", mb: 2 }} />
                <Typography variant="h2" color="error" gutterBottom>
                    500
                </Typography>
                <Typography variant="h5" gutterBottom>
                    서버에 문제가 발생했습니다.
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: "gray" }}>
                    잠시 후 다시 시도해 주세요.
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

export default ServerErrorPage;