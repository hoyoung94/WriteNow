import React from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import TestChart from './Chart';

const defaultTheme = createTheme();

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
export default function Search() {
    return (
        <ThemeProvider theme={defaultTheme}>
            {/* <Paper  
                sx={{
                    width: '100%',
                }}>
                <ResponsiveAppBar />
            </Paper> */}
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
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Paper elevation={0} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '500px', justifyContent: 'center' }}>
                                    <Typography
                                        variant="h3"
                                        noWrap
                                        component="h3">
                                        <Box component="span" sx={{ color: '#3399FF' }}>W</Box>
                                        <Box component="span" sx={{ color: 'black' }}>rite Now</Box>
                                        <Box component="span" sx={{ color: '#3399FF' }}>!</Box>
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="h6">
                                        한눈에 쉽고 빠르게 각종 분야의 트렌드를 확인하자!
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container maxWidth="lg" sx={{ mt: 1, mb: 1, }}>
                        <Grid container spacing={0.5}>
                            <Grid item xs={12}>
                                <Paper elevation={0} sx={{ p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '500px', justifyContent: 'center' }}>
                                    <Typography
                                        variant="h5"
                                        noWrap
                                        component="h5">
                                        키워드를 검색하여 최근 도서 트렌드를 확인할 수 있어요!
                                    </Typography>
                                    <Button type="submit" variant="contained" color="primary" sx={{ fontSize: '16px', padding: '10px 20px', minWidth: '150px' }}>
                                        시작하기
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container maxWidth="lg" sx={{ mt: 1, mb: 1, }}>
                        <Grid container spacing={0.5}>
                            <Grid item xs={12}>
                                <Paper elevation={0} sx={{ p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '500px', justifyContent: 'center' }}>
                                    <Typography
                                        variant="h5"
                                        noWrap
                                        component="h5">
                                        관심있는 분야의 트렌드를 확인해보세요!
                                    </Typography>
                                    <TestChart/>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                    <Copyright sx={{ pt: 2 }} />

                </Box>
            </Box>
        </ThemeProvider>
    )
}