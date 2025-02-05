import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard from './StatCard';
import axiosInstance from '../../api/axiosInstance';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
// const data = [
//   {
//     title: 'Users',
//     value: '14k',
//     interval: 'Last 30 days',
//     trend: 'up',
//     data: [
//       200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
//       360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
//     ],
//   },
//   {
//     title: '총 유저 수',
//     value: `${userCount}명`,
//     interval: 'Today',
//     trend: 'neutral',
//     data: new Array(30).fill(userCount), // 최근 30일간 유지 (단순 예시)
//   },
//   {
//     title: 'Event count',
//     value: '200k',
//     interval: 'Last 30 days',
//     trend: 'neutral',
//     data: [
//       500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
//       520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
//     ],
//   },
// ];

export default function MainGrid() {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [unansweredCount, setUnansweredCount] = useState(0); // 미답변 문의 개수
  const [unansweredByDate, setUnansweredByDate] = useState([]); // 날짜별 미답변 개수 저장

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axiosInstance.get('/users/summary');
      setUsers(response.data);
      setUserCount(response.data.length); // 총 유저 수 업데이트
    };

    const fetchQuestions = async () => {
      const response = await axiosInstance.get('/questions');
      //   const unanswered = response.data.filter(q => !q.questionState).length; // 미답변 개수 계산
      //   setUnansweredCount(unanswered);
      // };
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
  
  console.log("📌 unansweredByDate:", unansweredByDate);
  const data = [
    {
      title: '사용자',
      value: `${userCount}명`,
      interval: '사용자수',
      trend: 'up',
      data: [], // 최근 30일간 유지 (단순 예시)
    },
    // {
    //   title: 'Users',
    //   value: '14k',
    //   interval: 'Last 30 days',
    //   trend: 'up',
    //   data: [
    //     200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
    //     360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    //   ],
    // },
    {
      title: '접속량',
      value: '325',
      interval: '일별/월별/연별',
      trend: 'neutral',
      data: [],
    },
    {
      title: '문의사항',
      value: `${unansweredCount}건`, // 미답변 개수 표시
      interval: 'Q&A',
      trend: 'down',
      data: unansweredByDate.map(d => ({ x: d.date, y: d.count })), // 날짜별 미답변 개수 전달
      //data: unansweredByDate.map(d => ({ x: d.date, y: d.count })), // ✅ 날짜 포함
    },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 4 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        {/* <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid> */}
        <Grid size={{ xs: 12, md: 6 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}

// import React from 'react';
// import Grid from '@mui/material/Grid';
// import StatCard from './StatCard';
// import PageViewsBarChart from './PageViewsBarChart';
// import SessionsChart from './SessionsChart';

// export default function MainGrid() {
//   return (
//     <Grid container spacing={2}>
//       {/* KPI 카드 */}
//       <Grid item xs={12} md={4}>
//         <StatCard
//           title="다운로드 완료율"
//           value="85%"
//           interval="지난 30일간"
//           trend="up"
//           data={[75, 80, 82, 85, 85, 87, 90]}
//         />
//       </Grid>
//       <Grid item xs={12} md={4}>
//         <StatCard
//           title="평균 작업 횟수"
//           value="12회"
//           interval="지난 30일간"
//           trend="neutral"
//           data={[10, 11, 12, 13, 12, 12, 12]}
//         />
//       </Grid>
//       <Grid item xs={12} md={4}>
//         <StatCard
//           title="이탈률"
//           value="15%"
//           interval="지난 30일간"
//           trend="down"
//           data={[20, 18, 17, 16, 15, 15, 14]}
//         />
//       </Grid>

//       {/* 차트 */}
//       <Grid item xs={12} md={6}>
//         <PageViewsBarChart />
//       </Grid>
//       <Grid item xs={12} md={6}>
//         <SessionsChart />
//       </Grid>
//     </Grid>
//   );
// }
