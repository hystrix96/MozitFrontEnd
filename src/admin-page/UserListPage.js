import React, { useState }from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import Footer from '../components/Footer';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, Chip } from '@mui/material';


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
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page

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
      <div>
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',  // 수직 방향으로 배치
                alignItems: 'center',
                justifyContent: 'flex-start', // 상단 정렬
                minHeight: 'calc(100vh - 64px)', // AppBar를 제외한 전체 높이
                padding: 4,
                marginTop: '64px', // AppBar를 위한 상단 여백
            }}
        >
            <Box sx={{
                maxWidth: 1000,
                width: '100%',
                }}
            >
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
                                : "N/A";
                            
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
                    rowsPerPageOptions={[]} // Options for how many rows per page
                    component="div"
                    count={users.length} // Total number of notices
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Box>
        <Footer />
      </div>
    </AppTheme>
  );
}