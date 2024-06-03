import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import BasicSelect from './SearchOption';
import BookTable from './BookTable';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const ariaLabel = { 'aria-label': 'description' };

const defaultTheme = createTheme();

const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(e.target.elements.query.value);
};

export default function SearchResult() {
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
                                        <Typography variant="h5" component="h5" gutterBottom sx={{ pl: 2 }}>
                                            장르별 트렌드 확인
                                        </Typography>
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
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} >
                                <Paper
                                    elevation={5}
                                    sx={{
                                        justifyContent: 'center',
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        border: '1px solid #4028ca', borderRadius: '20px'
                                    }}
                                >
                                    <Typography variant="h5" component="h5" gutterBottom sx={{ pl: 2 }}>
                                        키워드 관심도 변화
                                    </Typography>
                                    <Chart />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            {/* 연관 장르 테이블 */}
                            <Grid item xs={12} md={6}>
                                <Paper elevation={5} sx={{ p: 1, display: 'flex', flexDirection: 'column', border: '1px solid #4028ca', borderRadius: '20px' }}>
                                    <BookTable />
                                </Paper>
                            </Grid>
                            {/* 연관 책 테이블 */}
                            <Grid item xs={12} md={6}>
                                <Paper elevation={5} sx={{ p: 1, display: 'flex', flexDirection: 'column', border: '1px solid #4028ca', borderRadius: '20px' }}>
                                    <BookTable />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider >
    );
}