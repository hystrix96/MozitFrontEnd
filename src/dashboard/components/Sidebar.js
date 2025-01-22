import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import { Link } from 'react-router-dom';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';


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
  { text: 'Home', icon: <HomeRoundedIcon />, link: '/dashboard' },
  { text: '공지사항', icon: <NotificationsRoundedIcon />, link: '/noticelist' },
  { text: 'Q&A', icon: <QuestionAnswerRoundedIcon />, link: '/questionlist' },
  { text: '회원조회', icon: <GroupsRoundedIcon />, link: '/userlist' },
];

export default function Sidebar() {
  const [selectedIndex, setSelectedIndex] = React.useState(null); // 상태로 선택된 인덱스 관리

  const handleListItemClick = (index) => {
    setSelectedIndex(index); // 클릭된 인덱스로 상태 업데이트
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
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block',marginBottom:2 }}>
            <ListItemButton
              component={Link}
              to={item.link}
              selected={selectedIndex === index} // 상태에 따라 활성화 여부 결정
              onClick={() => handleListItemClick(index)} // 클릭 이벤트로 상태 변경
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
    </Box>
    </Drawer>
  );
}
