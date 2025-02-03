import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {  Check as CheckIcon } from '@mui/icons-material';
import { useAuth } from '../Context/AuthContext'
import axiosInstance from '../api/axiosInstance'

export default function Pricing(props) {
    const [tiers, setTiers] = useState([]);
    const [user, setUser] = useState([]);
    const authUser = useAuth();
    const [loading, setLoading] = useState(true);

    const fetchUserData = async () => {
        try{
            const response = await axiosInstance.get('/my');
            setUser(prevUser => ({ ...prevUser, ...response.data }));
        }catch(error){
            console.error('사용자 정보 가져오는 중 오류 발생:', error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if (authUser) {
            setUser(authUser);
            if (!authUser.userSub) {
                fetchUserData();
            }
        } else {
            fetchUserData();
        }
    }, [authUser]);

    useEffect(() => {
        const tiersData = [
            {
                title: 'Basic',
                priceMonthly: '10,000',
                priceYearly: '100,000',
                description: [
                    '100MB 용량',
                    '유해요소 모자이크 기능',
                    '개인정보 모자이크 기능',
                ],
                buttonText: 'Basic 플랜 시작하기',
                buttonVariant: 'outlined',
                buttonColor: 'primary',
                userType: ['일반 사용자', '소규모 개인 콘텐츠 크리에이터'],
            },
            {
                title: 'Pro',
                priceMonthly: '40,000',
                priceYearly: '400,000',
                description: [
                    '2GB 용량',
                    '모든 모자이크 기능\n(유해요소, 개인정보, 사람 얼굴)',
                    '라이브 스트리밍 기능',
                ],
                buttonText: 'Pro 플랜 시작하기',
                buttonVariant: 'outlined',
                buttonColor: 'primary',
                userType: ['비즈니스 고객', '영상 컨텐츠 크리에이터'],
            },
            {
                title: 'Premium',
                priceMonthly: '110,000',
                priceYearly: '1,100,000',
                description: [
                    '30GB 용량',
                    '모든 모자이크 기능\n(유해요소, 개인정보, 사람 얼굴)',
                    '라이브 스트리밍 기능',
                ],
                buttonText: 'Premium 플랜 시작하기',
                buttonVariant: 'outlined',
                buttonColor: 'primary',
                userType: ['영상 제작 프로덕션', '대형 콘텐츠 제작업체'],
            },
        ];

        const updatedTiers = tiersData.map((tier) => ({
            ...tier,
            subscribed: tier.title === user.userSub, // user.sub와 비교하여 구독 여부 설정
        }));

        setTiers(updatedTiers); // 상태 업데이트
    }, [authUser, user.userSub]);

    const handleSubscriptionChange = async (newSub) => {
        try {
            const updatedData = { userSub: newSub };
            const response = await axiosInstance.patch('/my', updatedData);
            if (response.status === 200) {
                setUser((prevUser) => ({
                    ...prevUser,
                    userSub: newSub, // Update local state
                }));
            }
        } catch (error) {
            console.error('구독 정보 변경 중 오류 발생:', error);
            alert('구독 정보 변경 중 오류가 발생했습니다.');
        }
    };

    const handleCancelSubscription = async () => {
        try {
            const updatedData = { userSub: null };
            const response = await axiosInstance.patch('/my', updatedData);
            if (response.status === 200) {
                setUser((prevUser) => ({
                    ...prevUser,
                    userSub: null, // Update local state
                }));
            }
        } catch (error) {
            console.error('구독 해지 중 오류 발생:', error);
            alert('구독 해지 중 오류가 발생했습니다.');
        }
    };

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <AppAppBar />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',  // 수직 방향으로 배치
                    alignItems: 'center',
                    justifyContent: 'flex-start', // 상단 정렬
                    minHeight: 'calc(100vh - 64px)', // AppBar를 제외한 전체 높이
                    padding: 4,
                    marginTop: '80px', // AppBar를 위한 상단 여백
                }}
            >
                <Box
                    sx={{
                        maxWidth: 1000,
                        width: '100%',
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        내 구독
                    </Typography>
                    <Box
                        sx={{ textAlign: 'center' }}
                    >
                        <Grid
                            container
                            spacing={6} // 카드들 사이 간격 조정
                            wrap='nowrap'
                            sx={{
                                justifyContent: 'center', // 카드들이 중앙에 정렬되도록 설정
                                alignItems: 'stretch', // 카드의 높이를 맞춤
                                p: 3,
                            }}
                        >
                            {tiers.map((tier) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={tier.title}
                                >
                                    <Card
                                        sx={{
                                            p: 4,
                                            width: '100%', // 카드가 Grid의 너비를 따르도록 설정
                                            width: '300px', // 카드의 최대 너비 제한
                                            height: '550px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            gap: 3,
                                            ...(tier.subscribed && {
                                                border: '2px solid',
                                                borderColor: 'secondary.main',
                                                boxShadow: 4,
                                            }),
                                            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', // 애니메이션 추가
                                            '&:hover': {
                                                transform: 'translateY(-10px)', // 마우스를 올리면 카드가 위로 올라가는 효과
                                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)', // 마우스를 올리면 그림자가 짙어짐
                                            }
                                        }}
                                    >
                                        <CardContent>
                                            <Typography component="h3" variant="h2" sx={{ mb: 2 }}>
                                                {tier.title}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    mt: 2,
                                                    mb: 2,
                                                }}
                                            >
                                                {tier.userType.map((type) => (
                                                    <Typography key={type} variant="body2" sx={{ mb: 1 }}>
                                                        {type}
                                                    </Typography>
                                                ))}
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'baseline',
                                                    justifyContent: 'center',
                                                    mt: 2,
                                                }}
                                            >
                                                <Typography
                                                    component="span"
                                                    sx={{
                                                        fontSize: '1rem',
                                                        color: 'text.secondary',
                                                        fontWeight: 'bold',
                                                        mr: 0.5,
                                                    }}
                                                >
                                                    ₩
                                                </Typography>
                                                <Typography component="h3" variant="h2">
                                                    {tier.priceMonthly}
                                                </Typography>
                                                <Typography
                                                    component="span"
                                                    sx={{
                                                        fontSize: '1rem',
                                                        color: 'text.secondary',
                                                        fontWeight: 'bold',
                                                        ml: 1,
                                                        alignSelf: 'flex-end',
                                                    }}
                                                >
                                                    /월
                                                </Typography>
                                            </Box>
                                            <Typography
                                                variant="body2"
                                                sx={{ mt: 2, color: 'text.secondary' }}
                                            >
                                                한 달에 ₩{tier.priceMonthly} 청구 예정
                                            </Typography>
                                            <CardActions sx={{ mt: 2 }}>
                                                <Button
                                                    fullWidth
                                                    variant={
                                                        tier.subscribed
                                                            ? tier.buttonVariant // 구독 중인 경우 원래 색상 사용
                                                            : user.userSub
                                                                ? tier.buttonVariant // 다른 플랜을 구독 중인 경우 원래 색상 사용
                                                                : 'contained' // 구독하지 않은 경우
                                                    }
                                                    color={
                                                        tier.subscribed
                                                            ? tier.buttonColor // 구독 중인 경우 원래 색상 사용
                                                            : user.userSub
                                                                ? tier.buttonColor // 다른 플랜을 구독 중인 경우 원래 색상 사용
                                                                : 'secondary' // 구독하지 않은 경우 secondary 색상 사용
                                                    }
                                                    onClick={() => {
                                                        if (tier.subscribed) {
                                                            handleCancelSubscription();
                                                        } else {
                                                            handleSubscriptionChange(tier.title);
                                                        }
                                                    }}
                                                >
                                                    {tier.subscribed
                                                        ? '플랜 해지하기'
                                                        : user.userSub
                                                            ? `${tier.title} 플랜으로 변경하기`
                                                            : `${tier.title} 플랜 시작하기`}
                                                </Button>
                                            </CardActions>
                                            <Divider sx={{ my: 3 }} />
                                            <Box
                                                sx={{
                                                    pt: 2,
                                                }}
                                            >
                                                {tier.description.map((line, index) => (
                                                    <Box
                                                        key={index}
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            mb: 1.5,
                                                        }}
                                                    >
                                                        <CheckIcon
                                                            sx={{ fontSize: '1.2rem', color: 'primary.main', mr: 1 }}
                                                        />
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                flexGrow: 1,
                                                                textAlign: 'left',
                                                                whiteSpace: 'pre-line',
                                                            }}
                                                        >
                                                            {line}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </AppTheme>
    );
}