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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

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
  const [selectedEnterprise, setSelectedEnterprise] = useState('전체');
  const [enterprises, setEnterprises] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/users/summary');
        const data = response.data;
        setUserData(data);

        // 기업 목록 가져오기 (중복 제거)
        const uniqueEnterprises = Array.from(
          new Set(data.map((user) => user.enterpriseName))
        ).map((name) => ({ name }));

        setEnterprises(uniqueEnterprises);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };

    fetchData();
  }, []);

  const handleEnterpriseChange = (event) => {
    setSelectedEnterprise(event.target.value);
  };

  // 선택된 기업에 맞는 데이터 필터링
  const selectedEnterpriseData = selectedEnterprise === '전체'
    ? userData
    : userData.filter((user) => user.enterpriseName === selectedEnterprise);

  const totalWork = selectedEnterpriseData.reduce(
    (acc, user) => acc + (user.workCount || 0),
    0
  );
  const totalDownload = selectedEnterpriseData.reduce(
    (acc, user) => acc + (user.downloadCount || 0),
    0
  );


  // 차트 데이터 변환
  const chartData = [
    { label: '작업 수', value: totalWork },
    { label: '다운로드 수', value: totalDownload },
  ];

  const colors = ['hsl(220, 20%, 65%)', 'hsl(220, 20%, 42%)'];

  return (
    <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          {selectedEnterprise === '전체' ? '전체 회원' : `${selectedEnterprise}`}의 작업 및 다운로드 비율
        </Typography>

        {selectedEnterprise && (
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
              <PieCenterLabel
                primaryText={`${((totalDownload / (totalWork + totalDownload)) * 100).toFixed(0)}%`}
                secondaryText="Total Actions"
              />
            </PieChart>
          </Box>
        )}

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
              {/* 진행률 바가 0보다 클 때만 렌더링 */}
              {item.value > 0 && (
                <LinearProgress
                  variant="determinate"
                  value={(item.value / (totalWork + totalDownload)) * 100}
                  sx={{ [`& .${linearProgressClasses.bar}`]: { backgroundColor: colors[index % colors.length] } }}
                />
              )}
            </Stack>
          </Stack>
        ))}
        {/* 기업 선택 드롭다운 */}
        <FormControl fullWidth>
          <InputLabel>기업 선택</InputLabel>
          <Select
            value={selectedEnterprise}
            label="기업 선택"
            onChange={handleEnterpriseChange}
          >
            <MenuItem value="전체">전체</MenuItem>
            {enterprises.map((enterprise) => (
              <MenuItem key={enterprise.name} value={enterprise.name}>
                {enterprise.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
}
