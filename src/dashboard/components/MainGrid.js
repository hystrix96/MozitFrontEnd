import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import TotalDownload from './TotalDownload';
import TotalQuestions from './TotalQuestion';
import axiosInstance from '../../api/axiosInstance';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import AzureMonitorChart from './AzureMonitorChart';
import { Card, CardContent } from '@mui/material';

export default function MainGrid() {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [unansweredCount, setUnansweredCount] = useState(0); // 미답변 문의 개수
  const [unansweredByDate, setUnansweredByDate] = useState([]); // 날짜별 미답변 개수 저장
  const [unansweredList, setUnansweredList] = useState([]); // 미답변 문의 리스트 저장

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axiosInstance.get('/users/summary');
      setUsers(response.data);
      setUserCount(response.data.length); // 총 유저 수 업데이트
    };

    const fetchQuestions = async () => {
      const response = await axiosInstance.get('/questions');
      const unanswered = response.data.filter(q => !q.questionState); // 미답변만 필터링

      // 날짜별로 그룹화하여 개수 계산
      const groupedByDate = unanswered.reduce((acc, question) => {
        const date = dayjs(question.timestamp).format('YYYY-MM-DD'); // 날짜만 추출
        acc[date] = (acc[date] || 0) + 1; // 해당 날짜 개수 증가
        return acc;
      }, {});

      // 그래프를 위한 데이터 변환
      const formattedData = Object.keys(groupedByDate).map(date => ({
        date,
        count: groupedByDate[date],
      }));

      setUnansweredByDate(formattedData); // 상태 업데이트
      setUnansweredCount(unanswered.length); // 전체 미답변 개수 업데이트
    };

    fetchUsers();
    fetchQuestions();
  }, []);

  // 30일 날짜 배열 생성 (현재 날짜 기준으로 지난 30일)
  const daysIn30 = Array.from({ length: 30 }, (_, index) =>
    dayjs().subtract(index, 'day').format('YYYY-MM-DD')
  ).reverse(); // 최신 날짜부터 순서대로

  // 미답변 개수 매칭 (미답변이 없으면 0)
  const answeredData = daysIn30.map(date => {
    const entry = unansweredByDate.find(d => d.date === date);
    return entry ? entry.count : 0; // 해당 날짜에 미답변 개수가 있으면 가져오고, 없으면 0
  });

  const data = [
    {
      title: '문의사항',
      value: `${unansweredCount}건`, // 미답변 개수 표시
      interval: 'Q&A',
      trend: 'down',
      data: unansweredByDate.map(d => ({ x: d.date, y: d.count })), // 날짜별 미답변 개수 전달
    },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2, mt: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <ChartUserByCountry />
        <TotalDownload />
        <TotalQuestions />
        </Grid>
        
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          시스템 모니터링
        </Typography>
        <Grid container spacing={78.5}>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card sx={{ backgroundColor: '#ffffff', borderRadius: 1, height: '100%', width: '600px' }}>
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
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ backgroundColor: '#ffffff', borderRadius: 1, height: '100%', width: '600px' }}>
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
        <Grid container spacing={2} columns={12}>
        </Grid>
        <Copyright sx={{ my: 4 }} />
    </Box>
  );
}