import * as React from 'react';
import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance'; // API 요청을 위한 axios 인스턴스
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const StyledText = styled('text')(({ theme }) => ({
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fill: (theme.vars || theme).palette.text.secondary,
}));

function PieCenterLabel({ primaryText, secondaryText }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <>
      <StyledText x={left + width / 2} y={top + height / 2 - 10} style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
        {primaryText}
      </StyledText>
      <StyledText x={left + width / 2} y={top + height / 2 + 15} style={{ fontSize: '0.9rem' }}>
        {secondaryText}
      </StyledText>
    </>
  );
}

export default function TotalDownload() {
  const [totalWorkCount, setTotalWorkCount] = useState(0);
  const [totalDownloadCount, setTotalDownloadCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/users/summary');
        const userData = response.data;

        const totalWork = userData.reduce((acc, user) => acc + (user.workCount || 0), 0);
        const totalDownload = userData.reduce((acc, user) => acc + (user.downloadCount || 0), 0);

        setTotalWorkCount(totalWork);
        setTotalDownloadCount(totalDownload);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };
    fetchData();
  }, []);

  // 차트 데이터 변환
  const chartData = [
    { label: '작업 수', value: totalWorkCount },
    { label: '다운로드 수', value: totalDownloadCount },
  ];

  const colors = ['hsl(220, 20%, 65%)', 'hsl(220, 20%, 42%)'];

  return (
    <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          전체 회원의 작업 및 다운로드 비율
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <PieChart
  colors={colors}
  margin={{ left: 80, right: 80, top: 80, bottom: 80 }}
  series={[
    {
      data: chartData,
      innerRadius: 75,
      outerRadius: 100,
      paddingAngle: 2,
      highlightScope: { faded: 'global', highlighted: 'item' },
    },
  ]}
  height={260}
  width={260}
  slotProps={{ legend: { hidden: true } }}
>
            <PieCenterLabel primaryText={`${(totalDownloadCount/(totalWorkCount + totalDownloadCount)*100).toFixed(0)}%`} secondaryText="Total Actions" />
          </PieChart>
        </Box>
        {chartData.map((item, index) => (
          <Stack key={index} direction="row" sx={{ alignItems: 'center', gap: 2, pb: 2 }}>
            <Stack sx={{ gap: 1, flexGrow: 1 }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                  {item.label}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.value}건
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={(item.value / (totalWorkCount + totalDownloadCount)) * 100}
                sx={{ [`& .${linearProgressClasses.bar}`]: { backgroundColor: colors[index % colors.length] } }}
              />
            </Stack>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
}
