  import React, {useEffect, useState} from "react";
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { styled, useTheme } from '@mui/system';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email'

const items = [
  {
    icon: '/assets/img/brand/yunho.png',
    title: '서윤호',
    description: 'Infra/Frontend',
    links: {
      github: 'https://github.com/hystrix96',
      email: 'mailto:leo8071004@naver.com'
    },
  },
  {
    icon: '/assets/img/brand/mina.png',
    title: '강민아',
    description: 'Backend',
    links: {
      github: 'https://github.com/minkongkang',
      email: 'mailto:uter828@naver.com'
    },
  },
  {
    icon: '/assets/img/brand/yunho.png',
    title: '장현호',
    description: 'AI/Data',
    links: {
      github: 'https://github.com/LargeSsun',
      email: 'mailto:wkjang74@naver.com'
    },
  },
  {
    icon: '/assets/img/brand/mina.png',
    title: '민지영',
    description: 'AI/Data',
    links: {
      github: 'https://github.com/IMZI0',
      email: 'mailto:1alswldud@naver.com'
    },
  },
  {
    icon: '/assets/img/brand/yunho.png',
    title: '이세훈',
    description: 'Frontend',
    links: {
      github: 'https://github.com/huniiieee',
      email: 'mailto:kyung6805@naver.com'
    },
  },
  {
    icon: '/assets/img/brand/mina.png',
    title: '정연주',
    description: 'Backend/Frontend',
    links: {
      github: 'https://github.com/racoi',
      email: 'mailto:919jung@gmail.com'
    },
  },
  {
    icon: '/assets/img/brand/yunho.png',
    title: '고정우',
    description: 'Frontend',
    links: {
      github: 'https://github.com/kjwjj',
      email: 'mailto:rhwjddn89@naver.com'
    },
  },
  {
    icon: '/assets/img/brand/mina.png',
    title: '이지현',
    description: 'Backend/Frontend',
    links: {
      github: 'https://github.com/jh226',
      email: 'mailto:leejh020206@gmail.com'
    },
  },
];

const icons = [
  { src: "/assets/icons/face1.png", top: "30%", left: "27%" },
  { src: "/assets/icons/face2.png", top: "60%", left: "93%" },
  { src: "/assets/icons/cig1.png", top: "12%", left: "50%" },
  { src: "/assets/icons/cig2.png", top: "25%", left: "90%" },
  { src: "/assets/icons/knife1.png", top: "40%", left: "90%" },
  { src: "/assets/icons/knife2.png", top: "48%", left: "5%" },
  { src: "/assets/icons/id1.png", top: "68%", left: "45%" },
  { src: "/assets/icons/id2.png", top: "75%", left: "30%" },

  { src: "/assets/icons/gun1.png", top: "23%", left: "3%" },
  { src: "/assets/icons/gun2.png", top: "65%", left: "2%" },
  { src: "/assets/icons/carnum1.png", top: "25%", left: "60%" },
  { src: "/assets/icons/people1.png", top: "75%", left: "65%" },
];

const FloatingIcons = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100vh",
  overflow: "hidden",
  zIndex: 10, 
}));

const Icon = styled("img")(({ theme }) => ({
  position: "absolute",
  width: "80px",
  animation: `floatRandom 5s infinite ease-in-out`,
  animationDelay: `${Math.random() * 5}s`, // 랜덤한 애니메이션 지연
  "@keyframes floatRandom": {
    "0%": {
      transform: "translate(0, 0)",
    },
    "25%": {
      transform: `translate(${Math.random() * 20 - 10}px, ${
        Math.random() * 20 - 10
      }px)`, // 덜 움직이는 범위 설정 (최대 ±10px)
    },
    "50%": {
      transform: `translate(${Math.random() * 30 - 15}px, ${
        Math.random() * 30 - 15
      }px)`, // 덜 움직이는 범위 설정 (최대 ±15px)
    },
    "75%": {
      transform: `translate(${Math.random() * 20 - 10}px, ${
        Math.random() * 20 - 10
      }px)`, // 덜 움직이는 범위 설정
    },
    "100%": {
      transform: "translate(0, 0)", // 원래 위치로 돌아옴
    },
  },
}));

const CenteredText = styled(Box)(({ isVisible }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  pointerEvents: "none",
  opacity: isVisible ? 1 : 0,
  transition: "opacity 1s ease-out, transform 1s ease-out",
}));

export default function Testimonials() {
  const theme = useTheme();

const [isFirstTextVisible, setFirstTextVisible] = useState(false);
 const [isSecondTextVisible, setSecondTextVisible] = useState(false);

 // 화면에 텍스트가 보이도록 하는 효과
 useEffect(() => {
  setTimeout(() => {
    setFirstTextVisible(true); // 첫 번째 텍스트 보이게
  }, 500); // 0.5초 후에 나타나도록 설정

  setTimeout(() => {
    setSecondTextVisible(true); // 두 번째 텍스트 보이게
  }, 1500); // 1.5초 후에 두 번째 텍스트 나타나도록 설정
}, []);

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 20 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary', fontWeight: 'bold', fontSize: '2.5rem' }}
        >
          About Us
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            fontStyle: 'italic',
            fontSize: '1.1rem',
          }}
        >
          Aivle School 6기 수도권 4반 13조
        </Typography>
      </Box>

       {/* <Box id="hero" sx={{ position: "relative", width: "100%" }}>
        <FloatingIcons>
          {icons.map((icon, index) => (
            <Icon
              key={index}
              src={icon.src}
              alt={`icon-${index}`}
              style={{
                top: icon.top,
                left: icon.left,
              }}
            />
          ))}
          
          <CenteredText isVisible={isFirstTextVisible}>
            <Typography
              variant="h2"
              sx={(theme) => ({
                fontWeight: "bold",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                textAlign: "center",
                lineHeight: 1.5,
                whiteSpace: "nowrap",
                opacity: 1,
                transform: "translateY(0)",
                transition: "none",
              })}
            >
              저희는{" "}
              <span
                style={{
                  color: "#3870ff",
                  textShadow: "0px 0px 15px rgba(56, 112, 255, 0.8)",
                }}
              >
                별거아니조
              </span>
                입니다.
            </Typography>
          </CenteredText>
        </FloatingIcons>
      </Box> */}

      <Grid container spacing={4}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: '10px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: 2,
                }}
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    border: '4px solid white',
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: '600',
                  marginBottom: 1,
                  color: theme.palette.text.primary,
                }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  marginBottom: 2,
                }}
              >
                {item.description}
              </Typography>
              <Stack direction="row" justifyContent="center" spacing={2}>
                {Object.entries(item.links).map(([key, link]) => (
                  <IconButton
                    key={key}
                    color="inherit"
                    size="large"
                    href={link}
                    target={key === 'email' ? '_self' : '_blank'} // 이메일은 '_self'로 설정하여 현재 창에서 열리게 함
                    sx={{
                      '&:hover': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    {key === 'github' ? <GitHubIcon /> : key==='email' ? <EmailIcon /> : null}
                  </IconButton>
                ))}
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
