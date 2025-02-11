import React from 'react';
import { Card, CardContent, Typography} from '@mui/material';
import Grid from '@mui/material/Grid2';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import AzureMonitorChart from '../dashboard/components/AzureMonitorChart';

export default function SystemStatus(props) {

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
            
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
            </Grid>
    </AppTheme>
  );
}