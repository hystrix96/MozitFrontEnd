import * as React from 'react';

import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import MenuContent from './components/MenuContent';
import AppTheme from '../shared-theme/AppTheme';
import Noticelist from '../admin-page/NoticeListPage';
import QuestionListPage from '../admin-page/QuestionListPage';
import UserListPage from '../admin-page/UserListPage';

import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props) {
  const [selectedComponent, setSelectedComponent] = React.useState('MainGrid'); // 초기값 설정
  const [currentMenu, setCurrentMenu] = React.useState('Home'); // 현재 메뉴 이름 상태 추가
  

  
  const onMenuSelect = (component) => {
    setSelectedComponent(component); // 선택된 컴포넌트를 상태로 설정
    const menuMap = {
      MainGrid: 'Home',
      Noticelist: '공지사항',
      QuestionListPage: 'Q&A',
      UserListPage: '회원조회',
    };
    setCurrentMenu(menuMap[component] || 'Home'); // 선택된 메뉴에 따라 제목 업데이트
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Noticelist':
        return <Noticelist />;
      case 'QuestionListPage':
        return <QuestionListPage />;
      case 'UserListPage':
        return <UserListPage />;
      default:
        return <MainGrid />;
    }
  };

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        {/* MenuContent에 onMenuSelect 전달 */}
        <MenuContent onMenuSelect={onMenuSelect} />
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header currentMenu={currentMenu}/>
            {renderComponent()} {/* 선택된 컴포넌트를 렌더링 */}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
