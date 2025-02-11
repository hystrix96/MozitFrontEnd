import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';
import Sitemark from './SitemarkIcon';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';


const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar() {
  const [open, setOpen] = useState(false);
  const [openWorkSubMenu, setOpenWorkSubMenu] = useState(false);  // 작업 메뉴 서브 메뉴
  const [openUserSubMenu, setOpenUserSubMenu] = useState(false);  // 사용자 메뉴 서브 메뉴

  const { accessToken, username, isTokenFetched } = useAuth();

  const isLoggedIn = accessToken != null && accessToken !== '';  // accessToken이 존재하면 로그인 상태로 간주
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post('/users/logout', {}, {
        headers: {
          Authorization: accessToken, // 액세스 토큰을 헤더에 포함
        },
      });
      if (response.status === 200) {
        alert('로그아웃 성공!');
        window.location.href = '/';
      } else {
        throw new Error('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 에러:', error);
      alert('로그아웃 요청 중 문제가 발생했습니다.');
    }
  };

  const handleMouseEnterWork = () => setOpenWorkSubMenu(true); // 작업 메뉴 서브 메뉴 표시
  const handleMouseLeaveWork = () => setOpenWorkSubMenu(false); // 작업 메뉴 서브 메뉴 숨김

  const handleMouseEnterUser = () => setOpenUserSubMenu(true); // 사용자 메뉴 서브 메뉴 표시
  const handleMouseLeaveUser = () => setOpenUserSubMenu(false); // 사용자 메뉴 서브 메뉴 숨김

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // "작업" 버튼 클릭시 로그인 여부 확인 후 처리
  const handleWorkClick = () => {
    if (isLoggedIn) {
      navigate('/edit'); // 로그인 상태라면 작업 페이지로 이동
    } else {
      alert('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.');
      navigate('/sign-in'); // 로그인되지 않으면 로그인 페이지로 이동
    }
  };

  // "라이브" 버튼 클릭시 로그인 , 구독 정보 여부 확인 후 처리 
const handleLiveClick = async () => {
  if (isLoggedIn) {
    // 로그인된 상태일 때 구독 정보를 확인
    const canNavigate = await fetchSub(); // 구독 정보 확인 후 리다이렉션 처리
    if (canNavigate) {
      navigate('/live'); // 구독 정보가 유효하면 라이브 페이지로 이동
    }
  } else {
    alert('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.');
    navigate('/sign-in'); // 로그인되지 않으면 로그인 페이지로 이동
  }
};

  // 구독정보 확인
const fetchSub = async () => {
  try {
    // 구독 정보 가져오기
    const response = await axiosInstance.get('/my');

    // 구독자 정보 확인
    if (!response.data.userSub) {
      alert("구독자 전용 서비스입니다.");
      navigate("/mysubpage"); // 구독자 전용 서비스인 경우 구독 페이지로 이동
      return false; // navigate 후 실행되지 않도록 false 반환
    } else if (response.data.userSub === 'Basic') {
      alert("Pro, Premium 구독자 전용 서비스입니다.");
      navigate("/mysubpage"); // Basic 구독자일 경우 Pro, Premium 전용 페이지로 이동
      return false; // navigate 후 실행되지 않도록 false 반환
    }

    return true; // 구독 정보가 유효하면 true 반환
  } catch (error) {
    console.error('구독 정보 가져오는 중 오류 발생:', error);
    alert("구독 정보 가져오는 중 오류가 발생했습니다.");
    navigate("/mysubpage"); // 오류 발생 시 구독 페이지로 이동
    return false; // 오류가 발생한 경우 navigate 후 실행되지 않도록 false 반환
  }
};

  // "문의" 버튼 클릭시 로그인 여부 확인 후 처리
  const handleQuestion = () => {
    if (isLoggedIn) {
      navigate('/question'); // 로그인 상태라면 작업 페이지로 이동
    } else {
      alert('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.');
      navigate('/sign-in'); // 로그인되지 않으면 로그인 페이지로 이동
    }
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Sitemark height={20} />
            <Box sx={{ display: { xs: 'none', md: 'flex' }, px: 5 }}>
              <Button variant="text" color="info" size="small" component={Link} to="/aboutus">
                About us
              </Button>
              <Box
                onMouseEnter={handleMouseEnterWork}
                onMouseLeave={handleMouseLeaveWork}
                sx={{ position: 'relative' }} // 상대 위치로 서브 메뉴 배치
              >
                <Button variant="text" color="info" size="small">
                  작업
                </Button>
                {openWorkSubMenu && (
                  <Box
                    sx={{
                      paddingLeft: 2,
                      paddingTop: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      backgroundColor: (theme) => theme.palette.background.paper,
                      color: (theme) => theme.palette.text.primary,
                      boxShadow: 1,
                      borderRadius: 1,
                      zIndex: 10,
                      padding: 1,
                    }}
                  >
                    <Button variant="text" color="info" size="small" onClick={handleWorkClick}>
                      동영상
                    </Button>
                    <Button variant="text" color="info" size="small" onClick={handleLiveClick}>
                      라이브
                    </Button>
                  </Box>
                )}
              </Box>
              <Button variant="text" color="info" size="small" component={Link} to="/notice">
                공지사항
              </Button>
              <Button variant="text" color="info" size="small" component={Link} to="/faq">
                FAQ
              </Button>
              <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }} onClick={handleQuestion}>
                문의하기
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            {username ? (
              <>

                <Box
                  onMouseEnter={handleMouseEnterUser}
                  onMouseLeave={handleMouseLeaveUser}
                  sx={{ position: 'relative' }}
                >
                  <Button variant="text" color="info" size="small">
                    <AccountCircleRoundedIcon />
                    {`${username}`}
                  </Button>
                  {openUserSubMenu && (
                    <Box
                      sx={{
                        paddingLeft: 2,
                        paddingTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        position: 'absolute',
                        top: '100%',
                        left: '50%',  // 부모 요소의 50% 위치로 설정
                        transform: 'translateX(-50%)',  // 정확히 가운데로 정렬
                        backgroundColor: (theme) => theme.palette.background.paper,
                        color: (theme) => theme.palette.text.primary,
                        boxShadow: 1,
                        borderRadius: 1,
                        zIndex: 10,
                        padding: 1,
                      }}
                    >
                      <Button variant="text" color="info" size="small" sx={{ whiteSpace: 'nowrap' }} component={Link} to="/mypageupdate" >
                        개인정보 수정
                      </Button>
                      <Button variant="text" color="info" size="small" component={Link} to="/myworkpage">
                        내 작업결과
                      </Button>
                      <Button variant="text" color="info" size="small" component={Link} to="/myquestion">
                        내 문의
                      </Button>
                      <Button variant="text" color="info" size="small" component={Link} to="/mysubpage">
                        내 구독
                      </Button>
                      <Button variant="text" color="info" size="small" onClick={handleLogout}>
                        로그아웃
                      </Button>
                    </Box>
                  )}
                </Box>
              </>
            ) : (
              <>
                <Button color="primary" variant="text" size="small" component={Link} to="/sign-in">
                  로그인
                </Button>
                <Button color="primary" variant="text" size="small" component={Link} to="/agree">
                  회원가입
                </Button>
              </>
            )}
            <ColorModeIconDropdown />
          </Box>


          {/* 모바일 메뉴 */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between', // 좌우로 배치
                    alignItems: 'center', // 수직 정렬
                  }}
                >
                  <Sitemark height={20} />
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuItem component={Link} to="/aboutus">
                  <Button variant="text" color="info" size="small" >
                    Aboutus
                  </Button>
                </MenuItem>

                <MenuItem>
                  <Box
                    onMouseEnter={handleMouseEnterWork}
                    onMouseLeave={handleMouseLeaveWork}
                    sx={{ position: 'relative' }}
                  >
                    <Button variant="text" color="info" size="small">
                      작업
                    </Button>
                    {openWorkSubMenu && (
                      <Box
                        sx={{
                          paddingLeft: 2,
                          paddingTop: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 1,
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          backgroundColor: (theme) => theme.palette.background.paper,
                          color: (theme) => theme.palette.text.primary,
                          boxShadow: 1,
                          borderRadius: 1,
                          zIndex: 10,
                          padding: 1,
                          width: '200px',  // 원하는 너비로 설정
                          height: 'auto',   // 높이를 자동으로 설정하거나, 원하는 값으로 설정
                        }}
                      >
                        <Button variant="text" color="info" size="" onClick={handleWorkClick}>
                          동영상
                        </Button>
                        <Button variant="text" color="info" size="small">
                          라이브
                        </Button>
                      </Box>
                    )}
                  </Box>
                </MenuItem>

                <MenuItem component={Link} to="/notice">
                  <Button variant="text" color="info" size="small" >
                    공지사항
                  </Button>
                </MenuItem>

                <MenuItem component={Link} to="/faq">
                  <Button variant="text" color="info" size="small" >
                    FAQ
                  </Button>
                </MenuItem>

                <MenuItem onClick={handleQuestion}>
                  <Button variant="text" color="info" size="small" >
                    문의하기
                  </Button>
                </MenuItem>

                <Divider sx={{ my: 1 }} />
                {username ? (
                  <>
                    {/* 로그인 상태 */}
                    <MenuItem component={Link} to="/mypageupdate">
                      <Button variant="text" color="info" size="small">
                        개인정보 수정
                      </Button>
                    </MenuItem>
                    <MenuItem component={Link} to="/myworkpage">
                      <Button variant="text" color="info" size="small">
                        내 작업결과
                      </Button>
                    </MenuItem>
                    <MenuItem component={Link} to="/myquestion">
                      <Button variant="text" color="info" size="small">
                        내 문의
                      </Button>
                    </MenuItem>
                    <MenuItem component={Link} to="/mysubpage">
                      <Button variant="text" color="info" size="small">
                        내 구독
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button variant="text" color="info" size="small" onClick={handleLogout}>
                        로그아웃
                      </Button>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    {/* 비로그인 상태 */}
                    <MenuItem component={Link} to="/sign-in">
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button color="primary" variant="text" size="small" component={Link} to="/sign-in">
                          로그인
                        </Button>
                        <Button color="primary" variant="contained" size="small" component={Link} to="/agree">
                          회원가입
                        </Button>
                      </Box>
                    </MenuItem>
                  </>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}