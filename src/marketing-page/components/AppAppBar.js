import React, {useState} from 'react';
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
import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';
import Sitemark from './SitemarkIcon';
import { Link } from 'react-router-dom';

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
  const [open, setOpen] = React.useState(false);
  const [openSubMenu, setOpenSubMenu] = React.useState(false);

    const handleMouseEnter = () => setOpenSubMenu(true); // 서브 메뉴 표시
  const handleMouseLeave = () => setOpenSubMenu(false); // 서브 메뉴 숨김

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const toggleSubMenu = () => {
    setOpenSubMenu((prev) => !prev);  // 하위 메뉴 열기/닫기
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
            <Sitemark height={20}/>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text" color="info" size="small">
                About us
              </Button>
              <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{ position: 'relative' }} // 상대 위치로 서브 메뉴 배치
      >
        <Button variant="text" color="info" size="small">
          작업
        </Button>
        {openSubMenu && (
          <Box
            sx={{
              paddingLeft: 2,
              paddingTop: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              position: 'absolute', // 부모 박스 기준 위치
              top: '100%', // 버튼 아래에 배치
              left: 0, // 왼쪽 정렬
              backgroundColor: '#333', // 어두운 배경색
              color: '#fff', // 흰색 텍스트
              boxShadow: 1, // 그림자 추가
              borderRadius: 1, // 메뉴 모서리 둥글게
              zIndex: 10, // 다른 요소 위로 올림
              padding: 1, // 메뉴 내부 여백 추가
            }}
          >
            <Button variant="text" color="info" size="small">
              동영상
            </Button>
            <Button variant="text" color="info" size="small">
              라이브
            </Button>
          </Box>
        )}
      </Box>
              <Button variant="text" color="info" size="small">
                공지사항
              </Button>
              <Button variant="text" color="info" size="small" component={Link} to="/faq">
                FAQ
              </Button>
              <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }} component={Link} to="/question">
                문의하기
              </Button>
              <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                Blog
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
            <Button color="primary" variant="text" size="small" component={Link} to="/sign-in">
              로그인
            </Button>
            <Button color="primary" variant="contained" size="small" component={Link} to="/agree">
              회원가입
            </Button>
            <ColorModeIconDropdown />
          </Box>
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
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuItem>About us</MenuItem>
                <MenuItem onClick={toggleSubMenu}>작업</MenuItem>
                {openSubMenu && (  // 하위 메뉴 열리면 아래 항목들을 표시
                  <Box sx={{ paddingLeft: 2, paddingTop: 1 }}>
                    <MenuItem>동영상</MenuItem>
                    <MenuItem>라이브</MenuItem>
                  </Box>
                )}
                <MenuItem>공지사항</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem>문의하기</MenuItem>
                <MenuItem>Blog</MenuItem>
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Button color="primary" variant="contained" fullWidth>
                    로그인
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="outlined" fullWidth component={Link} to="/signup">
                    회원가입
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
