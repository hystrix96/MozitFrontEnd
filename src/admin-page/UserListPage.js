import React, { useState, useEffect }from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import Stack from '@mui/material/Stack';
import MenuContent from '../dashboard/components/MenuContent'
import { alpha } from '@mui/material/styles';
import Header from '../dashboard/components/Header'
import axiosInstance from '../api/axiosInstance';

export default function UserListPage(props) {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0); // Current page number
  const [rowsPerPage, setRowsPerPage] = useState(10); // Number of rows per page

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axiosInstance.get('/users/summary');
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

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
                    <TableCell align="center">다운로드 비율</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, index) => {
                      const downloadRatio =
                        user.workCount > 0
                          ? ((user.downloadCount / user.workCount) * 100).toFixed(2)
                          : '0.00';

                      return (
                        <TableRow key={user.id}>
                          <TableCell align="left">{index + 1 + page * rowsPerPage}</TableCell>
                          <TableCell align="left">{user.username}</TableCell>
                          <TableCell align="left">{user.enterpriseName}</TableCell>
                          <TableCell align="left">{user.workCount}</TableCell>
                          <TableCell align="left">{user.downloadCount}</TableCell>
                          <TableCell align="center">{downloadRatio}%</TableCell>
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