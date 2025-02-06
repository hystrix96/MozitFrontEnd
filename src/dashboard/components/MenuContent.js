import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import { Link } from 'react-router-dom';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';


const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});


const mainListItems = [
  { text: '대시보드 홈', icon: <HomeRoundedIcon />, link: '/admin/dashboard' },
  {
    text: '사이트 관리',
    icon: <GroupsRoundedIcon />,
    children: [
      { text: '회원 정보', link: '/admin/users' },
      { text: '공지사항', link: '/admin/notice' },
      { text: 'Q&A', link: '/admin/qna' },
    ],
  },
  { text: '관리자 계정 설정', icon: <GroupsRoundedIcon />, link: '/admin/admin' },
];

export default function MenuContent() {
  const [selectedIndex, setSelectedIndex] = React.useState(null); // 상태로 선택된 인덱스 관리

  const handleListItemClick = (index) => {
    setSelectedIndex(index); // 클릭된 인덱스로 상태 업데이트
  };

  const [open, setOpen] = React.useState({}); // 하위 메뉴 상태 관리

  const handleToggle = (index) => {
    setOpen((prev) => ({ ...prev, [index]: !prev[index] })); // 클릭된 메뉴의 상태 토글
  };

  return (
     <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
    <List dense sx={{ fontSize: '1.1rem', gap: 2 }}> {/* 전체 폰트 크기와 간격 조정 */}
      {mainListItems.map((item, index) => (
        <React.Fragment key={index}>
          {/* 상위 항목 */}
          <ListItem
            disablePadding
            sx={{
              mb: 2, // 카테고리 간의 간격 추가
            }}
          >
            <ListItemButton
              component={item.link ? Link : 'button'}
              to={item.link || undefined}
              onClick={() => item.children ? handleToggle(index) : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '1.2rem', // 폰트 크기 증가
                  fontWeight: 'bold', // 글자 강조
                }}
              />
              {item.children && (open[index] ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </ListItem>

          {/* 하위 항목 */}
          {item.children && (
            <Collapse in={open[index]} timeout="auto" unmountOnExit>
              <List
                component="div"
                disablePadding
                sx={{
                  pl: 4, // 하위 항목 들여쓰기
                  gap: 1, // 하위 항목 간 간격 조정
                }}
              >
                {item.children.map((subItem, subIndex) => (
                  <ListItem
                      key={subIndex}
                      disablePadding
                      sx={{
                        mb: 1, // 하위 항목 간 간격 추가
                      }}
                    >
                    <ListItemButton component={Link} to={subItem.link}>
                      <ListItemText
                        primary={subItem.text}
                        primaryTypographyProps={{
                          fontSize: '1rem', // 하위 항목 폰트 크기
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List>
    </Stack>
    </Box>
    </Drawer>
  );
}