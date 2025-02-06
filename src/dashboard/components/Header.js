import * as React from 'react';
import Stack from '@mui/material/Stack';
import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';
import Button from '@mui/material/Button';
import { useAuth } from '../../Context/AuthContext';
import axiosInstance from '../../api/axiosInstance';
import Sitemark from './SitemarkIcon';



export default function Header() {
    const { accessToken } = useAuth();
  
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post('/users/logout', {}, {
        headers: {
          Authorization: accessToken, // 액세스 토큰을 헤더에 포함
        },
      });
      if (response.status === 200) {
        alert('로그아웃 성공!');
        window.location.href="/";
      } else {
        throw new Error('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 에러:', error);
      alert('로그아웃 요청 중 문제가 발생했습니다.');
    }
  };
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
        px: 2,
      }}
      spacing={2}
    >
      <Sitemark height={20} />
      <Stack direction="row" sx={{ gap: 1 }}>
        <Button variant="contained" color="primary" size="small" onClick={handleLogout}>
                        로그아웃
        </Button>
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
