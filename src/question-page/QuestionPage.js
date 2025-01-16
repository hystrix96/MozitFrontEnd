import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from './components/AppAppBar';
import Footer from './components/Footer';
import { TextField, Button, Box, Typography, Grid2 } from '@mui/material';

export default function QuestionPage(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <div>
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 64px)',
            padding: 4,
          }}
        >
          <Box
            sx={{
              maxWidth: 1000, // 폼의 최대 너비 설정
              width: '100%', // 반응형으로 너비 설정
            }}
          >
            <Typography variant="h4" gutterBottom>
              문의하기
            </Typography>

            <Box
            sx={{
              maxWidth: 1000,
              width: '100%',
              padding: 3,
              boxShadow: 3,
              borderRadius: 2,
              bgcolor: 'background.paper',
              marginBottom: 2,
            }}
            >
                <Typography variant="body1">문의 분류</Typography>
            </Box>
            <Box
            sx={{
              maxWidth: 1000,
              width: '100%',
              padding: 3,
              boxShadow: 3,
              borderRadius: 2,
              bgcolor: 'background.paper',
            }}
            >
                <Grid2>
                    {/* 입력 폼 */}
                    <Grid2 item xs={12}>
                        <TextField label="문의 제목" variant="outlined" fullWidth required sx={{ marginBottom: 2}} />
                    </Grid2>
                    <Grid2 item xs={12}>
                        <TextField label="문의 내용" variant="outlined" fullWidth multiline rows={10} sx={{'& .MuiInputBase-root': {height: '300px', }, overflow: 'auto', marginBottom: 2}}/>
                    </Grid2>
                    <Grid2 item xs={12} display="flex" justifyContent="center">
                        <Button type="submit" variant="contained" color="primary" size="medium">
                        제출
                        </Button>
                    </Grid2>
                </Grid2>
            </Box>
          </Box>
        </Box>
        <Footer />
      </div>
    </AppTheme>
  );
}