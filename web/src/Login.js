import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import books from './images/books.jpg'

const defaultTheme = createTheme();

export default function Login() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <div>
                        <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography
                                variant="h4"
                                noWrap
                                component="h4">
                                Write Now!
                            </Typography>
                        </Grid>
                    </div>
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '300px', height: '400px', justifyContent: 'center' }}>
                                    <Typography
                                        variant="h4"
                                        noWrap
                                        component="h4">
                                        Login
                                    </Typography>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <div>
                                            <TextField id="id" label="ID" variant="outlined" />
                                        </div>
                                        <div>
                                            <TextField id="pw" label="Password" variant="outlined" />
                                        </div>
                                    </Box>
                                    <div>
                                        <Button variant="contained">로그인</Button>
                                    </div>
                                    <div>
                                        <a href='join.js' target='_blank' rel='noopener noreferrer'>
                                            회원가입
                                        </a>
                                    </div>
                                    <div>
                                        <a href='join.js' target='_blank' rel='noopener noreferrer'>
                                            아이디/비밀번호 찾기
                                        </a>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}