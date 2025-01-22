import React from 'react';
import { useParams } from 'react-router-dom';
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

export default function SystemStatus(props) {

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
              <Typography>SystemStatus</Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}