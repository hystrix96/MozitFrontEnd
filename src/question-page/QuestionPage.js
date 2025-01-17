import React , { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import {  TextField, Button, Box, Typography, Grid2, Switch, FormControlLabel, Collapse, FormGroup, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function QuestionPage(props) {
  const [category, setCategory] = useState('제품 및 서비스');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleImageDelete = () => {
    setSelectedImage(null);
  };
  
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
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
          <Box
            sx={{
              maxWidth: 1000,
              width: '100%',
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ marginBottom: 2 }}>
            문의하기
            </Typography>

            <Box
            sx={{
              maxWidth: 1000,
              width: '100%',
              padding: 1,
              paddingLeft: 3,
              boxShadow: 3,
              borderRadius: 2,
              bgcolor: 'background.paper',
              marginBottom: 2,
            }}
            >
                <Grid2 container alignItems="center">
                <Grid2 item xs={9}>
                  <Typography variant="body1" sx={{ marginRight: 2 }}>문의 분류</Typography>
                </Grid2>
                <Grid2 item xs={3}>
                  <FormControl fullWidth>
                    <Select
                      value={category}
                      onChange={handleCategoryChange}
                      sx = {{ width: 300}}
                    >
                      <MenuItem value="제품 및 서비스">제품 및 서비스</MenuItem>
                      <MenuItem value="계정 및 회원">계정 및 회원</MenuItem>
                      <MenuItem value="일반 문의">일반 문의</MenuItem>
                    </Select>
                  </FormControl>
                </Grid2>
              </Grid2>
            </Box>

            <Box
            sx={{
              maxWidth: 1000,
              width: '100%',
              padding: 3,
              boxShadow: 3,
              borderRadius: 2,
              bgcolor: 'background.paper',
            }}
            >
                <Grid2>
                    {/* 입력 폼 */}
                    <TextField 
                      label="문의 제목" 
                      variant="outlined" 
                      fullWidth 
                      required 
                      sx={{marginBottom: 2}}
                    />
                    <TextField label="문의 내용" variant="outlined" fullWidth required multiline rows={10} sx={{'& .MuiInputBase-root': {height: '300px', }, marginBottom: 2}}/>
                    
                    <Box>
                      {/* Hidden file input */}
                      <input
                        type="file"
                        accept="image/*"
                        id="image-upload"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                      />
                      {/* Button to trigger file input */}
                      <Button 
                        variant="contained" 
                        color="primary" 
                        component="label" 
                        htmlFor="image-upload"
                        size="medium"
                      >
                        이미지 첨부
                      </Button>
                      
                      {/* Image preview */}
                      {selectedImage && (
                        <Box mt={2}>
                          <img src={selectedImage} alt="Selected" width="200" height="auto" />
                        </Box>
                      )}

                      {/* Delete button */}
                      {selectedImage && (
                        <Box mt={2}>
                          <Button 
                            variant="outlined" 
                            color="secondary" 
                            onClick={handleImageDelete}
                            size="medium"
                          >
                            이미지 삭제
                          </Button>
                        </Box>
                      )}
                    </Box>
                    <Grid2 item xs={12} display="flex" justifyContent="center">
                        <Button type="submit" variant="contained" color="primary" size="medium">
                        제출
                        </Button>
                    </Grid2>
                </Grid2>
            </Box>
          </Box>
        </Box>
        <Footer />
      </div>
    </AppTheme>
  );
}