import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Fab,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Check as CheckIcon } from '@mui/icons-material';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance'


export default function Pricing() {
  const { accessToken, isTokenFetched } = useAuth();
  const [isYearly, setIsYearly] = React.useState(false);
  const [user, setUser] = useState([]);
  const [tiers, setTiers] = useState([]);
  const isLoggedIn = accessToken != null && accessToken !== '';
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.userSub) {
        axiosInstance.get('/my')
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error('구독 정보 가져오기 실패:', error);
            })
            .finally(() => setLoading(false));
    } else {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    const tiers = [
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
        recommended: false,
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
        recommended: false,
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
        recommended: false,
        userType: ['영상 제작 프로덕션', '대형 콘텐츠 제작업체'],
      },
    ];
    if (user) {
      const updatedTiers = tiers.map((tier) => ({
        ...tier,
        subscribed: tier.title === user.userSub, // 현재 사용자의 구독 상태 비교
      }));
      setTiers(updatedTiers);
    } else {
      setTiers(tiers);
    }
  }, [user]);

  const handleBottonClick = () => {
    if (isLoggedIn) {
      navigate('/mysubpage');
    } else {
      alert('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.');
      navigate('/sign-in');
    }
  };

  const handleSubscriptionChange = async (newSub) => {
    try {
      const response = await axiosInstance.patch('/my', { userSub: newSub });
      if (response.status === 200) {
        setUser((prevUser) => ({ ...prevUser, userSub: newSub }));
        navigate('/mysubpage');
      }
    } catch (error) {
      console.error('구독 변경 오류:', error);
      alert('구독 변경 중 오류가 발생했습니다.');
    }
  };

  const handleCancelSubscription = async () => {
    try {
      const response = await axiosInstance.patch('/my', { userSub: null });
      if (response.status === 200) {
        setUser((prevUser) => ({ ...prevUser, userSub: null }));
        navigate('/mysubpage');
      }
    } catch (error) {
      console.error('구독 해지 오류:', error);
      alert('구독 해지 중 오류가 발생했습니다.');
    }
  };

  const handleToggle = (value) => {
    setIsYearly(value);
  };

  return (
    <Container
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
      maxWidth="x1"
    >
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography
          component="h2"
          variant="body1"
          sx={{ color: 'text.secondary', mb: 1 }}
        >
          요금제
        </Typography>
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          sx={{
            color: 'text.primary',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            mb: 1
          }}
        >
          자신에게 맞는 요금제를 선택하여 효율적으로 작업하세요.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '10vh',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              p: 0.5,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: '50px',
              width: '300px',
            }}
          >
            <Fab
              color={!isYearly ? 'primary' : 'default'}
              variant="extended"
              onClick={() => handleToggle(false)}
              sx={{
                flexGrow: 1,
                boxShadow: 'none',
                textAlign: 'center',
                height: 'auto', // 기본 높이를 자동으로
                minHeight: '64px', // 최소 높이 지정
                borderRadius: '80px',
              }}
            >
              월간 플랜
            </Fab>
            <Fab
              color={isYearly ? 'primary' : 'default'}
              variant="extended"
              onClick={() => handleToggle(true)}
              sx={{
                flexGrow: 1,
                boxShadow: 'none',
                textAlign: 'center',
                height: 'auto', // 기본 높이를 자동으로
                minHeight: '64px', // 최소 높이 지정
                borderRadius: '80px',
                display: 'flex', // Flexbox 활성화
                flexDirection: 'column', // 콘텐츠를 세로로 정렬
                justifyContent: 'center', // 수직 방향 가운데 정렬
                alignItems: 'center', // 가로 방향 가운데 정렬
              }}
            >
              연간 플랜
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 0.1,
                  color: 'primary.main',
                  whiteSpace: 'pre-line' }}
              >
                20% 할인
              </Typography>
            </Fab>
          </Box>
        </Box>
        <Grid
          container
          spacing={4} // 카드들 사이 간격 조정
          wrap='wrap' // wrap을 'wrap'으로 변경하여 화면 크기에 따라 자동 정렬
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
                      {isYearly
                        ? {
                          Basic: '8,000',
                          Pro: '32,000',
                          Premium: '88,000',
                        }[tier.title]
                        : tier.priceMonthly}
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
                    {isYearly
                      ? {
                        Basic: '일 년에 ₩96,000 청구 예정',
                        Pro: '일 년에 ₩384,000 청구 예정',
                        Premium: '일 년에 ₩1,056,000 청구 예정',
                      }[tier.title]
                      : `한 달에 ₩${tier.priceMonthly} 청구 예정`}
                  </Typography>
                  <CardActions sx={{ mt: 2 }}>
                    <Button
                      fullWidth
                      variant={
                        user.userSub
                            ? tier.buttonVariant // 다른 플랜을 구독 중인 경우 원래 색상 사용
                                : 'contained' // 구독하지 않은 경우
                      }
                      color={
                        user.userSub
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
    </Container>
  );
}
