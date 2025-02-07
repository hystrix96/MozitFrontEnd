import * as React from "react";
import { useRef, useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import AppTheme from "../shared-theme/AppTheme";
import SitemarkIcon from "../components/SitemarkIcon";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import axiosInstance from '../api/axiosInstance'
import { useNavigate } from 'react-router-dom';

const StyledBox = styled("div")(({ theme }) => ({
  alignSelf: "center",
  width: "80%",
  aspectRatio: "16 / 9",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: "6px solid",
  outlineColor: "hsla(220, 25%, 80%, 0.2)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",
  backgroundColor: theme.palette.background.default,
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(10),
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
    outlineColor: "hsla(220, 20%, 42%, 0.1)",
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

export default function WebcamPage(props) {
  const socketRef = useRef(null);
  const [isCameraAllowed, setIsCameraAllowed] = useState(false);
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true); 
  const [value, setValue] = useState(0); // 탭 상태
  const [settings, setSettings] = useState({
    harmful: { mosaic: false, checkedItems: [], intensity: 50, size: 70 },
    privacy: { mosaic: false, checkedItems: [], intensity: 50, size: 70 },
    person: { mosaic: false, checkedPeople: [], intensity: 50, size: 70 },
  });
  const [imageSrc, setImageSrc] = useState("");
  const settingsRef = useRef(settings);
  const [mediaStream, setMediaStream] = useState(null);
  const navigate = useNavigate(); // useNavigate를 호출하여 navigate 함수 정의

  useEffect(() => {
    const fetchSub = async () => {
      try{
          const response = await axiosInstance.get('/my');
          console.log(response.data.userSub)
          if(!response.data.userSub){
            alert("구독자 전용 서비스입니다.");
            navigate("/mysubpage");
            return;
          }
          else if(response.data.userSub == 'Basic'){
            alert("Pro, Premium 구독자 전용 서비스입니다.");
            navigate("/mysubpage");
            return;
          }
      }catch(error){
          console.error('구독 정보 가져오는 중 오류 발생:', error);
          alert("구독 정보 가져오는 중 오류가 발생했습니다.");
          navigate("/mysubpage");
      }
    };

    fetchSub();
  }, [navigate]);

  // 카메라 허용 상태 저장
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => setIsCameraAllowed(true))
      .catch(() => setIsCameraAllowed(false));
  }, []);

  //웹소켓 연결 초기화
  useEffect(() => {
    let reconnectTimeout; // 재연결 타이머
    const connectWebSocket = () => {
      socketRef.current = new WebSocket("wss://mozit-fastapi-leo8071004-due6hwdzguebceh7.koreacentral-01.azurewebsites.net/process-screen/");
  
      socketRef.current.onopen = () => {
        console.log("✅ WebSocket 연결됨");
        setIsWebSocketConnected(true);
      };

      socketRef.current.onmessage = (event) => {
        console.log("수신:", performance.now());
        
        if (typeof event.data != "string") {
          const currentTime = performance.now();
          const blob = new Blob([event.data], { type: "image/jpeg" });
          const url = URL.createObjectURL(blob);
          requestAnimationFrame(() => {
            setImageSrc(url);
          });
  
          // 🔹 빠르게 URL 해제하여 메모리 누수 방지
          setTimeout(() => URL.revokeObjectURL(url), 20);
          console.log("Latency:", performance.now() - currentTime, "ms");
        }
      };
  
      socketRef.current.onclose = () => {
        console.log("❌ WebSocket 연결 종료");
        setIsWebSocketConnected(false);
  
        // 5초 후 자동 재연결 (무한 루프 방지)
        if (!reconnectTimeout) {
          reconnectTimeout = setTimeout(() => {
            console.log("🔄 WebSocket 재연결 시도...");
            connectWebSocket();
          }, 3000);
        }
      };
  
      socketRef.current.onerror = (error) => {
        console.error("⚠️ WebSocket 에러:", error);
        setIsWebSocketConnected(false);
      };
    };
  
    connectWebSocket(); // 웹소켓 연결 실행
  
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout); // 재연결 타이머 해제
      }
    };
  }, []);

  useEffect(() => {
    // 카메라 스트림 가져오기
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setMediaStream(stream);
      } catch (err) {
        console.error("카메라 스트림 초기화 실패:", err);
      }
    };
  
    initCamera();
  
    return () => {
      // 컴포넌트 언마운트 시 스트림 정리
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleTabChange = (_, newValue) => setValue(newValue);

  const handleCheckboxChange = (tab, effectType) => (event) => {
    setSettings((prevSettings) => {
      const updatedSettings = { ...prevSettings };
      updatedSettings[tab].mosaic = effectType === "mosaic" ? event.target.checked : false;
      return updatedSettings;
    });
  };

  const handleIntensityChange = (tab) => (event, newValue) => {
    setSettings((prev) => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        intensity: newValue + 70,
      },
    }));
  };

  const handleSizeChange = (tab) => (event, newValue) => {
    setSettings((prev) => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        size: newValue + 70,
      },
    }));
  };

  const handleHarmfulCheck = (itemClass, isChecked) => {
    setSettings((prev) => {
      const checkedItems = prev.harmful?.checkedItems || [];
      const updatedItems = isChecked
        ? [...checkedItems, itemClass]
        : checkedItems.filter((item) => item !== itemClass);

      return {
        ...prev,
        harmful: {
          ...prev.harmful,
          checkedItems: updatedItems,
        },
      };
    });
  };

  const handlePrivacyCheck = (itemClass, isChecked) => {
    
    setSettings((prev) => {
      const checkedItems = prev.privacy?.checkedItems || [];
      const updatedItems = isChecked
        ? [...checkedItems, itemClass]
        : checkedItems.filter((item) => item !== itemClass);
      return {
        ...prev,
        privacy: {
          ...prev.privacy,
          checkedItems: updatedItems,
        },
      };
    });
  };

  
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);
  
  const itemMappings = {
    harmful: {
      "술병": "alcohol",
      "담배": "cigarette",
      "혈흔": "blood",
      "총기류": "gun",
      "칼": "knife",
    },
    privacy: {
      "민증/운전면허증": "ID_card",
      "도로명주소판": "address_sign",
      "차량번호판": "license_plate",
    }
  };

  useEffect(() => {
    let interval;
    let mediaStream = null; // MediaStream을 저장
  
    const sendSettingsAndImage = async () => {
      const currentSettings = settingsRef.current;

      const harmfulChecklist = currentSettings.harmful.checkedItems
        .map(item => itemMappings.harmful[item] || item) // 매핑 적용
        .join(", ");

      const privacyChecklist = currentSettings.privacy.checkedItems
        .map(item => itemMappings.privacy[item] || item) // 매핑 적용
        .join(", ");
  
      // JSON 데이터 준비
      const settingsToSend = JSON.stringify({
        harmful: {
          intensity: currentSettings.harmful.intensity,
          size: currentSettings.harmful.size,
          checklist: harmfulChecklist,
        },
        privacy: {
          intensity: currentSettings.privacy.intensity,
          size: currentSettings.privacy.size,
          checklist: privacyChecklist,
        },
        person: {
          intensity: currentSettings.person.intensity,
          size: currentSettings.person.size,
          checklist: currentSettings.person.mosaic ? 1 : 0,
        },
      });
  
      // WebSocket으로 설정 데이터 전송
      if (socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({ text: settingsToSend }));
      }
  
      // MediaStream에서 프레임 캡처 및 전송
      if (mediaStream) {
        const video = document.createElement("video");
        video.srcObject = mediaStream;
  
        // 비디오 스트림 준비 후 캡처
        await new Promise((resolve) => (video.onloadedmetadata = resolve));
        video.play();
  
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
  
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
        // 캡처한 이미지를 Blob으로 변환
        canvas.toBlob((blob) => {
          if (blob && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(blob); // Blob 데이터를 WebSocket으로 전송
          }
        }, "image/jpeg", 0.7); // 압축률 70%
      }
    };
  
    if (isStreaming) {
      // MediaStream 초기화
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          mediaStream = stream;
        })
        .catch((err) => {
          console.error("Failed to initialize camera stream:", err);
        });
  
      // 주기적으로 데이터 전송
      interval = setInterval(() => {
        if (isStreaming && socketRef.current.readyState === WebSocket.OPEN) {
          sendSettingsAndImage();
        }
      }, 33); // 30fps
    } else {
      // 스트리밍 중지 시 스트림 정리
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
        mediaStream = null;
      }
      clearInterval(interval);
    }
  
    return () => {
      // 컴포넌트 언마운트 시 스트림 및 인터벌 정리
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
      clearInterval(interval);
    };
  }, [isStreaming]);
    

  const startStreaming = () => {
    if (!isWebSocketConnected) return;
    setIsStreaming(true); // 스트리밍 시작
  };
  
  const stopStreaming = () => {
    setIsStreaming(false);
    setImageSrc("");
  };
  

  const toggleCamera = () => {
    if (!isCameraAllowed) {
      alert("카메라 사용을 허용해주세요.");
      return;
    }
    setIsCameraOn((prev) => !prev);
  };  

  return (
    <AppTheme {...props} sx={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <CssBaseline enableColorScheme />
      <SitemarkIcon
        sx={{
          position: "fixed",
          top: "1rem",
          left: "1rem",
          padding: "0.5rem",
        }}
      />
      
      {!isWebSocketConnected ? (
        // 로딩 상태 표시
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ marginLeft: 2 }}>
            서버 연결 중...
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ flex: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh"  }}>

          <StyledBox>
            {imageSrc ? (
              // 서버에서 수신한 이미지 표시
              <img
                src={imageSrc}
                alt="수신된 이미지"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : isCameraAllowed === null ? (
              <Typography variant="h6" color="textSecondary">
                카메라 권한 확인 중...
              </Typography>
            ) : isCameraAllowed ? (
              isCameraOn ? (
                <Typography variant="h6" color="info">
                  라이브를 시작하세요.
                </Typography>
              ) : (
                <Typography variant="h6" color="error">
                  카메라가 꺼져 있습니다.
                </Typography>
              )
            ) : (
              <Typography variant="h6" color="error">
                카메라 사용 권한이 필요합니다. 브라우저 설정에서 카메라를 허용해주세요.
              </Typography>
            )}
          </StyledBox>

            {/* 버튼 */}
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
            {!isStreaming ? (
                <Button variant="contained" color="primary" onClick={startStreaming}>
                  라이브 시작
                </Button>
              ) : (
                <Button variant="contained" color="secondary" onClick={stopStreaming}>
                  라이브 중지
                </Button>
              )}
          </Stack>
        </Box>

        <Box sx={{ width: "25%", padding: 2, border: "1px solid #ccc", borderRadius: 2 }}>
          <Tabs value={value} onChange={handleTabChange} sx={{ marginBottom: 2 }}>
            <Tab label="유해요소" sx={{ border: "1px solid #ddd", borderRadius: 1, marginRight: 1 }} />
            <Tab label="개인정보" sx={{ border: "1px solid #ddd", borderRadius: 1, marginRight: 1 }} />
            <Tab label="사람" sx={{ border: "1px solid #ddd", borderRadius: 1 }} />
          </Tabs>

          {["harmful", "privacy", "person"].map((tab, index) =>
            value === index && (
              <Box key={tab} sx={{ border: "1px solid #eee", borderRadius: 2, padding: 2, marginBottom: 2 }}>
                <Box sx={{ border: "1px solid #ddd", borderRadius: 2, padding: 2, marginBottom: 2 }}>
                  <Typography variant="h6" sx={{ borderBottom: "1px solid #ddd", paddingBottom: 1 }}>
                    마스크 설정
                  </Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={settings[tab].mosaic}
                        onChange={handleCheckboxChange(tab, "mosaic")}
                      />
                    }
                    label="모자이크"
                  />
                </Box>

                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    padding: 2,
                    marginBottom: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ borderBottom: "1px solid #ddd", paddingBottom: 1 }}>
                    마스크 강도
                  </Typography>
                  <Slider
                    value={settings[tab].intensity - 70}
                    onChange={handleIntensityChange(tab)}
                    min={1}
                    max={10}
                    step={1}
                    valueLabelDisplay="auto"
                    disabled={!settings[tab].mosaic && !settings[tab].blur}
                  />
                </Box>

                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    padding: 2,
                    marginBottom: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ borderBottom: "1px solid #ddd", paddingBottom: 1 }}>
                    마스크 크기
                  </Typography>
                  <Slider
                    value={settings[tab].size - 70}
                    onChange={handleSizeChange(tab)}
                    min={1}
                    max={10}
                    step={1}
                    valueLabelDisplay="auto"
                    disabled={!settings[tab].mosaic && !settings[tab].blur}
                  />
                </Box>

                {tab === "harmful" && (
                  <Box sx={{ border: "1px solid #ddd", borderRadius: 2, padding: 2 }}>
                    <Typography variant="h6" sx={{ borderBottom: "1px solid #ddd", paddingBottom: 1 }}>
                      마스크 체크
                    </Typography>
                    {["술병", "담배", "혈흔", "총기류", "칼"].map((item) => (
                      <FormControlLabel
                        key={item}
                        control={
                          <Checkbox
                            disabled={!settings[tab].mosaic && !settings[tab].blur}
                            checked={settings.harmful.checkedItems.includes(item)}
                            onChange={(e) => handleHarmfulCheck(item, e.target.checked)}
                          />
                        }
                        label={item}
                      />
                    ))}
                  </Box>
                )}

                {tab === "privacy" && (
                  <Box sx={{ border: "1px solid #ddd", borderRadius: 2, padding: 2 }}>
                    <Typography variant="h6" sx={{ borderBottom: "1px solid #ddd", paddingBottom: 1 }}>
                      마스크 체크
                    </Typography>
                    {["민증/운전면허증", "도로명주소판", "차량번호판"].map((item) => (
                      <FormControlLabel
                        key={item}
                        control={
                          <Checkbox
                            disabled={!settings[tab].mosaic}
                            checked={settings.privacy.checkedItems.includes(item)}
                            onChange={(e) => handlePrivacyCheck(item, e.target.checked)}
                          />
                        }
                        label={item}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            )
          )}
        </Box>
      </Box>
      )}
    </AppTheme>
  );
}
