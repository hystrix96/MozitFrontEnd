import React, { useState }from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import Footer from '../components/Footer';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, Chip } from '@mui/material';
import Stack from '@mui/material/Stack';
import MenuContent from '../dashboard/components/MenuContent'
import { alpha } from '@mui/material/styles';
import Header from '../dashboard/components/Header'


const users = [
    {
      id: 1,
      username: '정연주',
      enterpriseName: 'KT',
      workNum: 15,
      downloadNum: 8
    },
    {
      id: 2,
      username: '고정우',
      enterpriseName: 'KT',
      workNum: 10,
      downloadNum: 10
    },
    {
      id: 3,
      username: '강민아',
      enterpriseName: 'KT',
      workNum: 10,
      downloadNum: 8
    },
    {
      id: 4,
      username: '이세훈',
      enterpriseName: 'KT',
      workNum: 20,
      downloadNum: 5
    },
    {
      id: 5,
      username: '민지영',
      enterpriseName: 'KT',
      workNum: 20,
      downloadNum: 10
    },
    {
      id: 6,
      username: '서윤호',
      enterpriseName: 'KT',
      workNum: 20,
      downloadNum: 7
    },
    {
        id: 7,
        username: '이지현',
        enterpriseName: 'KT',
        workNum: 10,
        downloadNum: 10
    },
];

export default function UserListPage(props) {
  const [page, setPage] = useState(0); // Current page number
  const [rowsPerPage, setRowsPerPage] = useState(10); // Number of rows per page

  // Handle change of page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change of rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };

  return (
       <AppTheme {...props}>
          <CssBaseline enableColorScheme />
          <Box sx={{ display: 'flex' }}>
        <MenuContent />
        
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
            <Header />
              <Box sx={{ maxWidth: 1000, width: '100%' }}>
            <Typography variant="h4" gutterBottom sx={{ marginBottom: 2 }}>
              회원 목록
            </Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">번호</TableCell>
                    <TableCell align="left">이름</TableCell>
                    <TableCell align="left">소속 기업</TableCell>
                    <TableCell align="left">작업 수</TableCell>
                    <TableCell align="left">다운로드 수</TableCell>
                    <TableCell align="left">다운로드 비율</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, index) => {
                      const downloadRatio =
                        user.workNum > 0
                          ? ((user.downloadNum / user.workNum) * 100).toFixed(2)
                          : 'N/A';

                      return (
                        <TableRow key={user.id}>
                          <TableCell align="left">{index + 1 + page * rowsPerPage}</TableCell>
                          <TableCell align="left">{user.username}</TableCell>
                          <TableCell align="left">{user.enterpriseName}</TableCell>
                          <TableCell align="left">{user.workNum}</TableCell>
                          <TableCell align="left">{user.downloadNum}</TableCell>
                          <TableCell align="left">{downloadRatio}%</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
          </Stack>
        </Box>
      </Box>
           </AppTheme>
  );
}
