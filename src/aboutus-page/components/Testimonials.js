  import React from "react";
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/system';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email'

const items = [
  {
    icon: '/assets/img/brand/yunho.jpg',
    title: '서윤호',
    description: 'Infra/Frontend',
    links: {
      github: 'https://github.com/hystrix96',
      email: 'mailto:leo8071004@naver.com'
    },
  },
  {
    icon: '/assets/img/brand/kma.png',
    title: '강민아',
    description: 'Backend',
    links: {
      github: 'https://github.com/minkongkang',
      email: 'mailto:uter828@naver.com'
    },
  },
  {
    icon: '/assets/img/brand/jhh.jpg',
    title: '장현호',
    description: 'AI/Data',
    links: {
      github: 'https://github.com/LargeSsun',
      email: 'mailto:wkjang74@naver.com'
    },
  },
  {
    icon: '/assets/img/brand/mjy.jpg',
    title: '민지영',
    description: 'AI/Data',
    links: {
      github: 'https://github.com/IMZI0',
      email: 'mailto:1alswldud@naver.com'
    },
  },
  {
    icon: '/assets/img/brand/lsh.jpg',
    title: '이세훈',
    description: 'Frontend',
    links: {
      github: 'https://github.com/huniiieee',
      email: 'mailto:kyung6805@naver.com'
    },
  },
  {
    icon: '/assets/img/brand/jyj.jpg',
    title: '정연주',
    description: 'Backend/Frontend',
    links: {
      github: 'https://github.com/racoi',
      email: 'mailto:919jung@gmail.com'
    },
  },
  {
    icon: '/assets/img/brand/kjw.jpg',
    title: '고정우',
    description: 'Frontend',
    links: {
      github: 'https://github.com/kjwjj',
      email: 'mailto:rhwjddn89@naver.com'
    },
  },
  {
    icon: '/assets/img/brand/ljh.jpg',
    title: '이지현',
    description: 'Backend/Frontend',
    links: {
      github: 'https://github.com/jh226',
      email: 'mailto:leejh020206@gmail.com'
    },
  },
];

export default function Testimonials() {
  const theme = useTheme();

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
