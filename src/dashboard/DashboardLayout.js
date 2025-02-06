// DashboardLayout.js
import React from 'react';
import { Box, CssBaseline, Stack } from '@mui/material';
import MenuContent from './components/MenuContent';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import AppTheme from '../shared-theme/AppTheme';
import { alpha } from '@mui/material/styles';

const DashboardLayout = ({ onMenuSelect, currentMenu, children }) => {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        {/* MenuContent에 onMenuSelect 전달 */}
        <MenuContent onMenuSelect={onMenuSelect} />
        <AppNavbar />
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
            <Header currentMenu={currentMenu} />
            {/* 자식 컴포넌트를 렌더링 */}
            {children}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
};

export default DashboardLayout;
