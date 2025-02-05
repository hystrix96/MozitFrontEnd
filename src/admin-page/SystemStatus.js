import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Typography, CircularProgress, Button, TextField, Grid2 } from '@mui/material';
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

import AzureMonitorChart from '../dashboard/components/AzureMonitorChart';

export default function SystemStatus(props) {

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      {/* <Box sx={{ display: 'flex', height: '100vh' }}> */}
        {/* Sidebar (MenuContent) */}
        {/* <MenuContent /> */}
        {/* <SideMenu /> */}

        {/* 오른쪽 영역 */}
        {/* <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          
          {/* Main Content */}
          {/* <Box
            component="main"
            sx={(theme) => ({
              flexGrow: 1,
              backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                : alpha(theme.palette.background.default, 1),
              overflow: 'auto',
            })}
          > */}
            {/* 제목 섹션 */}
            {/* <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, marginLeft: 2 }}>
              시스템 모니터링
            </Typography> */}
            
            <Grid container spacing={12} direction="row" justifyContent="space-between" alignItems="stretch" sx={{ width: '100%' }}>
              {/* CPU 사용량 카드 */}
              <Grid item xs={12} sm={6} md={5}>
                <Card sx={{ backgroundColor: '#f0f4ff', boxShadow: 2, borderRadius: 3, height: '100%', width: '500px' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                      CPU 사용량
                    </Typography>
                    <AzureMonitorChart 
                      metric="cpu_percent" 
                      subscriptionId="0a938e62-00ba-4c73-a908-3b285014b302" 
                      resourceGroup="mozit" 
                      resourceName="mozit-db" 
                    />
                  </CardContent>
                </Card>
              </Grid>
              
              {/* 메모리 사용량 카드 */}
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ backgroundColor: '#fff7e6', boxShadow: 2, borderRadius: 3, height: '100%', width: '500px' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                      메모리 사용량
                    </Typography>
                    <AzureMonitorChart 
                      metric="memory_percent" 
                      subscriptionId="0a938e62-00ba-4c73-a908-3b285014b302" 
                      resourceGroup="mozit" 
                      resourceName="mozit-db" 
                    />
                  </CardContent>
                </Card>
              </Grid>
              
              {/* 로그 쓰기 비율 카드 */}
              {/* <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ backgroundColor: '#e6f7f0', boxShadow: 2, borderRadius: 3, height: '100%', width: '500px' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                      로그 쓰기 비율
                    </Typography>
                    <AzureMonitorChart 
                      metric="log_write_percent" 
                      subscriptionId="0a938e62-00ba-4c73-a908-3b285014b302" 
                      resourceGroup="mozit" 
                      resourceName="mozit-db" 
                    />
                  </CardContent>
                </Card>
              </Grid> */}
            </Grid>
          {/* </Box> */}
        {/* </Box> */}
      {/* </Box> */}
    </AppTheme>
  );
}