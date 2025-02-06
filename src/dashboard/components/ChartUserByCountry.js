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
import Button from '@mui/material/Button';

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

export default function ChartUserByCountry() {
  const [companyUserCounts, setCompanyUserCounts] = useState({});
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4; // 한 페이지에 표시할 항목 수

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users/summary');
        const userData = response.data;

        // 기업별 사용자 수 계산
        const groupedUsers = userData.reduce((acc, user) => {
          if (!user.enterpriseName) return acc;
          acc[user.enterpriseName] = (acc[user.enterpriseName] || 0) + 1;
          return acc;
        }, {});

        setCompanyUserCounts(groupedUsers);
        setTotalUsers(userData.length);
      } catch (error) {
        console.error('유저 데이터 가져오기 실패:', error);
      }
    };
    fetchUsers();
  }, []);

  // 차트 데이터 변환
  const chartData = Object.entries(companyUserCounts).map(([name, value]) => ({
    label: name,
    value,
  }))
  .sort((a, b) => b.value - a.value);
// 페이지네이션에 필요한 데이터 잘라내기
const paginatedData = chartData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);


  const colors = ['hsl(220, 20%, 65%)', 'hsl(220, 20%, 42%)', 'hsl(220, 20%, 35%)', 'hsl(220, 20%, 25%)'];

  return (
    <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          소속 기업별 사용자 수
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
            <PieCenterLabel primaryText={`${totalUsers}`} secondaryText="Total Users" />
          </PieChart>
        </Box>
        {paginatedData.map((company, index) => (
          <Stack key={index} direction="row" sx={{ alignItems: 'center', gap: 2, pb: 2 }}>
            <Stack sx={{ gap: 1, flexGrow: 1 }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                  {company.label}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {company.value}명
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={(company.value / totalUsers) * 100}
                sx={{ [`& .${linearProgressClasses.bar}`]: { backgroundColor: colors[index % colors.length] } }}
              />
            </Stack>
          </Stack>
        ))}
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ pt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
          >
            이전
          </Button>
          <Button
            variant="outlined"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.floor(chartData.length / itemsPerPage)))}
            disabled={(currentPage + 1) * itemsPerPage >= chartData.length}
          >
            다음
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
