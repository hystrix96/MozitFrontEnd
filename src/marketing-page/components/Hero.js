import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import { useAuth } from "../../Context/AuthContext";
import SitemarkIcon from '../../components/SitemarkIcon';
import "@img-comparison-slider/react";

const StyledBox = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: "1200px", // 더 큰 너비 설정
  margin: "20px auto",
  position: "relative",
  aspectRatio: "16/9", // 가로 세로 비율 고정
  overflow: "hidden",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid rgba(0, 0, 0, 0.2)",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
}));

const IconContainer = styled(Box)(({ theme }) => ({
  transform: "translateX(-50%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2,
  "& img": {
    position: "absolute",
    opacity: 0,
    animation: "fadeInOut 8s infinite", 
  },
  "& img:nth-of-type(1)": {
    animationDelay: "0s", 
  },
  "& img:nth-of-type(2)": {
    animationDelay: "2s", 
  },
  "& img:nth-of-type(3)": {
    animationDelay: "4s", 
  },
  "& img:nth-of-type(4)": {
    animationDelay: "6s", 
  },
  "@keyframes fadeInOut": {
    "0%": { opacity: 0 },
    "10%": { opacity: 1 }, 
    "20%": { opacity: 1 }, 
    "40%": { opacity: 0 }, 
    "100%": { opacity: 0 },
  },
}));


export default function Hero({ onPricingButtonClick }) {
  const { username } = useAuth();
  const theme = useTheme();

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
        }),
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          {/* <IconContainer>
            <img
              src={
                theme.palette.mode === "dark"
                  ? "/assets/icons/face-white.png"
                  : "/assets/icons/face.png"
              }
              alt="Privacy Icon"
              style={{ width: "60px", height: "60px" }}
            />
            <img
              src={
                theme.palette.mode === "dark"
                  ? "/assets/icons/cigarette_white.png"
                  : "/assets/icons/cigarette.png"
              }
              alt="Cigarette Icon"
              style={{ width: "60px", height: "60px" }}
            />
            <img
              src={
                theme.palette.mode === "dark"
                  ? "/assets/icons/knife_white.png"
                  : "/assets/icons/knife.png"
              }
              alt="Knife Icon"
              style={{ width: "60px", height: "60px" }}
            />
            <img
              src={
                theme.palette.mode === "dark"
                  ? "/assets/icons/identification-card_white.png"
                  : "/assets/icons/identification-card.png"
              }
              alt="Knife Icon"
              style={{ width: "60px", height: "60px" }}
            />
          </IconContainer>

          <Typography
            variant="h1"
            sx={(theme) => ({
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(4rem, 12vw, 6rem)', // 더 큰 반응형 크기 설정
              fontWeight: 'bold', // 강조를 위한 굵기 추가
              textAlign: 'center', // 텍스트 중앙 정렬
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              lineHeight: 1.2, // 줄 간격 조정
              mt: 3, // 위쪽 여백
              mb: 3, // 아래쪽 여백
            })}
          >
            Mosaic&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'inherit', // 부모 크기를 따라감
                color: '#3870FF', // 강조 색상
                textShadow: '0px 0px 15px rgba(56, 112, 255, 0.8)', // 빛나는 효과 추가
              }}
            >
              It!
            </Typography>
          </Typography> */}

          <SitemarkIcon height={70}></SitemarkIcon>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' },
            }}
          >
            간략한 소개
          </Typography>
        </Stack>

        {/* <Stack
          spacing={3}
          sx={{
            alignItems: "center",
            width: { xs: "100%", sm: "70%" },
            pt: { xs: 5, sm: 5 },
          }}
        >
          {username ? (
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ minWidth: "fit-content" }}
              href="/edit"
            >
              작업하러 가기
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ minWidth: "fit-content" }}
              href="/sign-in"
            >
              로그인 하고 시작
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ minWidth: "fit-content" }}
            onClick={onPricingButtonClick}
          >
            요금제 알아보기
          </Button>
        </Stack> */}

        {/* 이미지 슬라이더 */}
        <StyledBox>
          <img-comparison-slider style={{ width: "100%", height: "100%" }}>
            <img
              slot="first"
              src="/assets/img/brand/face.png"
              alt="Before"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // 컨테이너에 맞게 채우기
              }}
            />
            <img
              slot="second"
              src="/assets/img/brand/face2.png"
              alt="After"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // 컨테이너에 맞게 채우기
              }}
            />
          </img-comparison-slider>
        </StyledBox>

        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}
        >
          <Typography
            variant="h2"
            sx={(theme) => ({
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "clamp(2rem, 5vw, 3rem)", // 반응형 크기
              color: theme.palette.mode === 'dark' ? "rgba(255, 255, 255, 0.9)" : '#000000',
              mt: 5,
              mb: 3,
              lineHeight: 1.2,
            })}
          >
            쉬운{" "}
            <span
              style={{
                color: "#3870ff", // 주황색 텍스트
                textShadow: "0px 0px 15px rgba(56, 112, 255, 0.8)", // 빛나는 효과
              }}
            >
              개인정보 보호
            </span>
            ,
            <br />
            유해요소 차단.
          </Typography>

        </Stack>
      </Container>
    </Box>
  );
}
