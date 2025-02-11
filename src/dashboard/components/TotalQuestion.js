import * as React from 'react';
import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Link } from 'react-router-dom';  // Link import 추가

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

export default function TotalQuestion() {
    const [answeredCount, setAnsweredCount] = useState(0);
    const [unansweredCount, setUnansweredCount] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [unansweredList, setUnansweredList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('전체');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/questions');
                const questionData = response.data;

                const answered = questionData.filter(q => q.questionState).length;
                const unansweredItems = questionData.filter(q => !q.questionState);

                setAnsweredCount(answered);
                setUnansweredCount(unansweredItems.length);
                setQuestions(questionData);
                setUnansweredList(unansweredItems);
                // ✅ questionType으로 카테고리 목록 생성 (중복 제거)
                const uniqueCategories = [...new Set(questionData.map(q => q.questionType))];
                setCategoryList(uniqueCategories);
            } catch (error) {
                console.error('문의 데이터 가져오기 실패:', error);
            }
        };
        fetchData();
    }, []);

    // ✅ 선택한 카테고리에 따라 미답변 목록 필터링
    const filteredQuestions = selectedCategory === '전체'
    ? unansweredList // '전체'일 경우 필터링 하지 않고 모든 항목을 반환
    : unansweredList.filter(q => q.questionType === selectedCategory);

    // 차트 데이터 변환
    const chartData = [
        { label: '답변 완료', value: answeredCount },
        { label: '미답변', value: unansweredCount },
    ];

    const colors = ['hsl(140, 50%, 50%)', 'hsl(0, 80%, 50%)'];

    return (
        <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2">
                    문의 답변 상태 비율
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
                        <PieCenterLabel primaryText={`${((answeredCount / (answeredCount + unansweredCount)) * 100).toFixed(0)}%`} secondaryText="Response Completion" />
                    </PieChart>
                </Box>

                {/* ✅ 상태별 데이터 출력 */}
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
                                value={(item.value / (answeredCount + unansweredCount)) * 100}
                                sx={{ [`& .${linearProgressClasses.bar}`]: { backgroundColor: colors[index % colors.length] } }}
                            />
                        </Stack>
                    </Stack>
                ))}

                {/* ✅ 문의 유형 선택 */}
                <FormControl fullWidth >
                    <InputLabel>문의 유형</InputLabel>
                    <Select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)} 
                    label="문의 유형">
                        <MenuItem value="전체">전체</MenuItem>
                        {categoryList.map((category, index) => (
                            <MenuItem key={index} value={category}>
                                {category === 'ACCOUNT'
                                    ? '계정 및 회원'
                                    : category === 'SERVICE'
                                        ? '제품 및 서비스'
                                        : category === 'GENERAL'
                                            ? '일반 문의'
                                            : category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* ✅ 미답변 리스트 출력 (유형별 필터링 적용됨) */}
                {unansweredList.length > 0 ? (
                    <>
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            미답변 문의 목록
                        </Typography>
                        <TableContainer component={Paper} sx={{ maxHeight: 100, overflowY: 'auto' }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">번호</TableCell>
                                        <TableCell align="left">제목</TableCell>
                                        <TableCell align="left">문의자</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredQuestions.map((question, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="left">{question.questionNum}</TableCell>
                                            <TableCell align="left">
                                                <Link to={`/admin/qna/${question.questionNum}`}>{question.questionTitle}</Link>
                                            </TableCell>
                                            <TableCell align="left">{question.userNum.userId}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                ) : (
                    <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                        미답변 문의 목록이 없습니다.
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}
