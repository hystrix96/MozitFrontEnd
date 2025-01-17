// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import Chip from '@mui/material/Chip';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Container from '@mui/material/Container';
// import Divider from '@mui/material/Divider';
// import Grid from '@mui/material/Grid2';
// import Typography from '@mui/material/Typography';
// import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
// import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

// const tiers = [
//   {
//     title: 'Free',
//     price: '0',
//     description: [
//       '10 users included',
//       '2 GB of storage',
//       'Help center access',
//       'Email support',
//     ],
//     buttonText: 'Sign up for free',
//     buttonVariant: 'outlined',
//     buttonColor: 'primary',
//   },
//   {
//     title: 'Professional',
//     subheader: 'Recommended',
//     price: '15',
//     description: [
//       '20 users included',
//       '10 GB of storage',
//       'Help center access',
//       'Priority email support',
//       'Dedicated team',
//       'Best deals',
//     ],
//     buttonText: 'Start now',
//     buttonVariant: 'contained',
//     buttonColor: 'secondary',
//   },
//   {
//     title: 'Enterprise',
//     price: '30',
//     description: [
//       '50 users included',
//       '30 GB of storage',
//       'Help center access',
//       'Phone & email support',
//     ],
//     buttonText: 'Contact us',
//     buttonVariant: 'outlined',
//     buttonColor: 'primary',
//   },
// ];

// export default function Pricing() {
//   return (
//     <Container
//       id="pricing"
//       sx={{
//         pt: { xs: 4, sm: 12 },
//         pb: { xs: 8, sm: 16 },
//         position: 'relative',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         gap: { xs: 3, sm: 6 },
//       }}
//     >
//       <Box
//         sx={{
//           width: { sm: '100%', md: '60%' },
//           textAlign: { sm: 'left', md: 'center' },
//         }}
//       >
//         <Typography
//           component="h2"
//           variant="h4"
//           gutterBottom
//           sx={{ color: 'text.primary' }}
//         >
//           요금제
//         </Typography>
//         <Typography variant="body1" sx={{ color: 'text.secondary' }}>
//           Quickly build an effective pricing table for your potential customers with
//           this layout. <br />
//           It&apos;s built with default Material UI components with little
//           customization.
//         </Typography>
//       </Box>
//       <Grid
//         container
//         spacing={3}
//         sx={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
//       >
//         {tiers.map((tier) => (
//           <Grid
//             size={{ xs: 12, sm: tier.title === 'Enterprise' ? 12 : 6, md: 4 }}
//             key={tier.title}
//           >
//             <Card
//               sx={[
//                 {
//                   p: 2,
//                   display: 'flex',
//                   flexDirection: 'column',
//                   gap: 4,
//                 },
//                 tier.title === 'Professional' &&
//                   ((theme) => ({
//                     border: 'none',
//                     background:
//                       'radial-gradient(circle at 50% 0%, hsl(220, 20%, 35%), hsl(220, 30%, 6%))',
//                     boxShadow: `0 8px 12px hsla(220, 20%, 42%, 0.2)`,
//                     ...theme.applyStyles('dark', {
//                       background:
//                         'radial-gradient(circle at 50% 0%, hsl(220, 20%, 20%), hsl(220, 30%, 16%))',
//                       boxShadow: `0 8px 12px hsla(0, 0%, 0%, 0.8)`,
//                     }),
//                   })),
//               ]}
//             >
//               <CardContent>
//                 <Box
//                   sx={[
//                     {
//                       mb: 1,
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                       gap: 2,
//                     },
//                     tier.title === 'Professional'
//                       ? { color: 'grey.100' }
//                       : { color: '' },
//                   ]}
//                 >
//                   <Typography component="h3" variant="h6">
//                     {tier.title}
//                   </Typography>
//                   {tier.title === 'Professional' && (
//                     <Chip icon={<AutoAwesomeIcon />} label={tier.subheader} />
//                   )}
//                 </Box>
//                 <Box
//                   sx={[
//                     {
//                       display: 'flex',
//                       alignItems: 'baseline',
//                     },
//                     tier.title === 'Professional'
//                       ? { color: 'grey.50' }
//                       : { color: null },
//                   ]}
//                 >
//                   <Typography component="h3" variant="h2">
//                     ${tier.price}
//                   </Typography>
//                   <Typography component="h3" variant="h6">
//                     &nbsp; per month
//                   </Typography>
//                 </Box>
//                 <Divider sx={{ my: 2, opacity: 0.8, borderColor: 'divider' }} />
//                 {tier.description.map((line) => (
//                   <Box
//                     key={line}
//                     sx={{ py: 1, display: 'flex', gap: 1.5, alignItems: 'center' }}
//                   >
//                     <CheckCircleRoundedIcon
//                       sx={[
//                         {
//                           width: 20,
//                         },
//                         tier.title === 'Professional'
//                           ? { color: 'primary.light' }
//                           : { color: 'primary.main' },
//                       ]}
//                     />
//                     <Typography
//                       variant="subtitle2"
//                       component={'span'}
//                       sx={[
//                         tier.title === 'Professional'
//                           ? { color: 'grey.50' }
//                           : { color: null },
//                       ]}
//                     >
//                       {line}
//                     </Typography>
//                   </Box>
//                 ))}
//               </CardContent>
//               <CardActions>
//                 <Button
//                   fullWidth
//                   variant={tier.buttonVariant}
//                   color={tier.buttonColor}
//                 >
//                   {tier.buttonText}
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// }
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckIcon from '@mui/icons-material/Check';
import Fab from '@mui/material/Fab';

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
    buttonText: 'Pro 플랜 구독하기',
    buttonVariant: 'contained',
    buttonColor: 'secondary',
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
    buttonText: 'Premium 플랜 구독하기',
    buttonVariant: 'outlined',
    buttonColor: 'primary',
    recommended: false,
    userType: ['영상 제작 프로덕션', '대형 콘텐츠 제작업체'],
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = React.useState(false);

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
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
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
          sx={{ color: 'text.primary', fontWeight: 'bold', whiteSpace: 'nowrap', mb: 3 }}
        >
          자신에게 맞는 요금제를 선택하여 효율적으로 작업하세요.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '8vh',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              mt: 2,
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
              }}
            >
              연간 플랜
              <Typography
                variant="caption"
                sx={{ display: 'block', mt: 0.5, color: 'primary.main', whiteSpace: 'pre-line' }}
              >
                20% 할인
              </Typography>
            </Fab>
          </Box>
        </Box>
        <Grid
          container
          spacing={4} // 카드들 사이 간격 조정
          wrap='nowrap'
          sx={{
            justifyContent: 'center', // 카드들이 중앙에 정렬되도록 설정
            alignItems: 'stretch' // 카드의 높이를 맞춤
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
                  maxWidth: '400px', // 카드의 최대 너비 제한
                  height: '550px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 3,
                  ...(tier.recommended && {
                    border: '2px solid',
                    borderColor: 'secondary.main',
                    boxShadow: 4,
                  }),
                }}
              >
                <CardContent>
                  <Typography component="h3" variant="h4" sx={{ mb: 2 }}>
                    {tier.title}
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
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
                      variant={tier.buttonVariant}
                      color={tier.buttonColor}
                    >
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                  <Divider sx={{ my: 2 }} />
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
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {line}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
