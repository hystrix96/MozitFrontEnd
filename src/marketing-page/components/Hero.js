import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import SitemarkIcon from '../../components/SitemarkIcon';
import "@img-comparison-slider/react";

const StyledLearnMoreButton = styled("button")(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  cursor: "pointer",
  outline: "none",
  border: 0,
  verticalAlign: "middle",
  textDecoration: "none",
  background: "transparent",
  padding: 0,
  fontSize: "inherit",
  fontFamily: "inherit",
  width: "10rem", // 버튼 너비 줄이기
  height: "auto",
  ".circle": {
    transition: "all 0.45s cubic-bezier(0.65, 0, 0.076, 1)",
    position: "relative",
    display: "block",
    margin: 0,
    width: "2.5rem", // 원 크기 줄이기
    height: "2.5rem", // 원 크기 줄이기
    background: theme.palette.mode === "dark" ? "#ffffff" : "#282936",
    borderRadius: "1.25rem",
  },
  ".icon": {
    transition: "all 0.45s cubic-bezier(0.65, 0, 0.076, 1)",
    position: "absolute",
    top: 0,
    bottom: 0,
    margin: "auto",
    background: theme.palette.mode === "dark" ? "#282936" : "#fff",
  },
  ".icon.arrow": {
    left: "0.5rem", // 화살표 위치 조정
    width: "0.9rem", // 화살표 크기 줄이기
    height: "0.1rem",
    background: "none",
    "&::before": {
      position: "absolute",
      content: '""',
      top: "-0.25rem",
      right: "0.05rem",
      width: "0.5rem", // 화살표 선 크기 줄이기
      height: "0.5rem",
      borderTop: `0.1rem solid ${theme.palette.mode === "dark" ? "#282936" : "#fff"
        }`,
      borderRight: `0.1rem solid ${theme.palette.mode === "dark" ? "#282936" : "#fff"
        }`,
      transform: "rotate(45deg)",
    },
  },
  ".button-text": {
    transition: "all 0.45s cubic-bezier(0.65, 0, 0.076, 1)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: "0.5rem 0", // 텍스트 영역 줄이기
    margin: "0 0 0 1.85rem",
    color: theme.palette.mode === "dark" ? "#ffffff" : "#282936", // 다크 모드 글자 색상
    fontWeight: 600, // 텍스트 두께 조정
    fontSize: "0.875rem", // 텍스트 크기 줄이기
    lineHeight: 1.6,
    textAlign: "center",
    textTransform: "uppercase",
  },
  "&:hover .circle": {
    width: "100%",
  },
  "&:hover .circle .icon.arrow": {
    background: theme.palette.mode === "dark" ? "#282936" : "#fff",
    transform: "translate(0.8rem, 0)", // 이동 거리 조정
  },
  "&:hover .button-text": {
    color: theme.palette.mode === "dark" ? "#282936" : "#ffffff", // 다크 모드 글자 색상
  },
}));

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
  zIndex: 2,
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
      transform: `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10
        }px)`, // 덜 움직이는 범위 설정 (최대 ±10px)
    },
    "50%": {
      transform: `translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15
        }px)`, // 덜 움직이는 범위 설정 (최대 ±15px)
    },
    "75%": {
      transform: `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10
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

export default function Hero({ onPricingButtonClick }) {
  const theme = useTheme();

  const [isFirstTextVisible, setFirstTextVisible] = useState(false);
  const [isSecondTextVisible, setSecondTextVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFirstTextVisible(true);
          setTimeout(() => setSecondTextVisible(true), 1000); // 첫 번째 문장 후 1초 뒤에 두 번째 문장 표시
        } else {
          setFirstTextVisible(false); // 화면에서 벗어나면 다시 false로 초기화
          setSecondTextVisible(false);
        }
      },
      { threshold: 0.5 } // 화면에 50% 이상 보일 때 트리거
    );

    const target = document.getElementById("centered-text");
    if (target) observer.observe(target);

    return () => observer.disconnect();
  }, []);

  // 슬라이더 자동으로 움직이기 & 드래그로 이동동
  const sliderRef = useRef(null);
  const [direction, setDirection] = useState(1); // 1: 오른쪽, -1: 왼쪽
  const [isDragging, setIsDragging] = useState(false); // 슬라이더 드래그 상태

  useEffect(() => {
    let interval;

    const moveSlider = () => {
      if (sliderRef.current && !isDragging) { // 드래그 중이 아닐 때만 이동
        const slider = sliderRef.current;
        const currentValue = parseFloat(slider.value);

        // 값 증가, 100%에 도달하면 다시 0으로 리셋
        const newValue = currentValue + direction * 0.7;
        // slider.value = newValue >= 100 ? 0 : newValue;

        if (newValue >= 100) {
          slider.value = 100;
          setDirection(-1); // 왼쪽으로 이동
        } else if (newValue <= 0) {
          slider.value = 0;
          setDirection(1); // 오른쪽으로 이동
        } else {
          slider.value = newValue;
        }
      }
    };

    // 50ms마다 슬라이더 이동
    interval = setInterval(moveSlider, 50);

    // 컴포넌트 언마운트 시 interval 정리
    return () => clearInterval(interval);
  }, [direction, isDragging]);

  useEffect(() => {
    const slider = sliderRef.current;

    if (slider) {
      // 슬라이더 클릭(드래그 시작)
      const handleMouseDown = () => {
        setIsDragging(true);
      };

      // 슬라이더 클릭 해제(드래그 종료)
      const handleMouseUp = () => {
        setIsDragging(false);
      };

      slider.addEventListener("mousedown", handleMouseDown);
      slider.addEventListener("mouseup", handleMouseUp);

      // 이벤트 정리
      return () => {
        slider.removeEventListener("mousedown", handleMouseDown);
        slider.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, []);

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
          pt: { xs: 14, sm: 15 }, //네비게이션바랑 Mosaic It! 간격줄이기(sm)
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          <Typography
            variant="h1"
            sx={(theme) => ({
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(2rem, 12vw, 2rem)', // 더 큰 반응형 크기 설정
              fontWeight: 'bold', // 강조를 위한 굵기 추가
              textAlign: 'center', // 텍스트 중앙 정렬
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              lineHeight: 1.2, // 줄 간격 조정
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
          </Typography>

          <SitemarkIcon height={70} sx={{ marginTop: "10px", marginBottom: "10px" }}></SitemarkIcon>
        </Stack>

        <StyledBox style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img-comparison-slider
            ref={sliderRef}
            style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <img
              slot="first"
              src="/assets/img/brand/face1.jpg"
              alt="Before"
              style={{
                width: "100%",
                height: "100%",
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
            <img
              slot="second"
              src="/assets/img/brand/face3.jpg"
              alt="After"
              style={{
                width: "100%",
                height: "100%",
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
          </img-comparison-slider>
        </StyledBox>

        <Stack
          spacing={3}
          sx={{
            alignItems: "center",
            width: { xs: "100%", sm: "70%" },
            pt: { xs: 5, sm: 5 },
          }}
        >

          <StyledLearnMoreButton onClick={onPricingButtonClick} className="learn-more">
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">요금제 알아보기</span>
          </StyledLearnMoreButton>
        </Stack>


        <Box id="hero" sx={{ position: "relative", width: "100%" }}>
          {/* 움직이는 아이콘 */}
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
          </FloatingIcons>

          {/* 중앙 텍스트 */}
          <CenteredText id="centered-text" isVisible={isFirstTextVisible}>
            <Typography
              variant="h2"
              sx={(theme) => ({
                fontWeight: "bold",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                textAlign: "center",
                lineHeight: 1.5,
                whiteSpace: "nowrap",
                opacity: isFirstTextVisible ? 1 : 0,
                transform: isFirstTextVisible
                  ? "translateY(0)"
                  : "translateY(20px)",
                transition: "opacity 1s ease-out, transform 1s ease-out",
              })}
            >
              쉬운{" "}
              <span
                style={{
                  color: "#3870ff",
                  textShadow: "0px 0px 15px rgba(56, 112, 255, 0.8)",
                }}
              >
                개인정보 보호
              </span>
            </Typography>
            <Typography
              variant="h2"
              sx={(theme) => ({
                fontWeight: "bold",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                textAlign: "center",
                lineHeight: 1.5,
                whiteSpace: "nowrap",
                opacity: isSecondTextVisible ? 1 : 0,
                transform: isSecondTextVisible
                  ? "translateY(0)"
                  : "translateY(20px)",
                transition: "opacity 1s ease-out, transform 1s ease-out",
              })}
            >
              유해요소 차단.
            </Typography>
          </CenteredText>
        </Box>

      </Container>
    </Box>
  );
}
