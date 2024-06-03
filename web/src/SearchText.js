import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import BasicSelect from './SearchOption';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import BookTable from './BookTable';
import { useQuery } from '@tanstack/react-query';
import { TextField, Button, CircularProgress, List, ListItem, ListItemText, Container, Typography, InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';


const ariaLabel = { 'aria-label': 'description' };

const defaultTheme = createTheme();

const handleSubmit = (e) => {
  e.preventDefault();
  setQuery(e.target.elements.query.value);
};
export default function SearchText() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: 'white',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* 장르 테이블 */}
              <Grid item xs={12}>
                <Paper elevation={5} sx={{ p: 2, display: 'flex', flexDirection: 'column', backgroundColor: '#EEF3FF', borderRadius: '20px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <Typography variant="h5" component="h5" gutterBottom sx={{ pl: 2 }} >
                      장르별 트렌드 확인
                    </Typography>
                    {/* <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                      <TrendingUpIcon />
                    </IconButton> */}
                  </Box>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: '20px' }}>
                    <TextField
                      style={{ backgroundColor: 'white', marginRight: '10px' }}
                      name="query"
                      type="text"
                      defaultValue={''}
                      variant="outlined"
                      label="검색어 입력"
                      fullWidth
                      // sx={{
                      //   '& .MuiInputBase-root': { backgroundColor: 'white' },
                      //   '& .MuiInputBase-root.Mui-focused': { backgroundColor: 'white' }
                      // }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ backgroundColor: "white" }}>
                            <IconButton type="submit" sx={{ p: '5px', backgroundColor: 'white' }} aria-label="search">
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </form>
                  {/* <BasicSelect /> */}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider >
  );
}