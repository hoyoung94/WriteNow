import React, { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import TestChart from './Chart';
import { Box, Button, Container, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography, Divider } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const defaultTheme = createTheme();

const imageSize = [
    '1024 x 1024',
    '1280 x 768',
    '768 x 1280',
    '2048 x 2048',
    '2048 x 1536',
    '1536 x 2048'
]

const samples = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
]

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
export default function GenerateImage() {

    const [size, setSize] = React.useState('');

    const [sample, setSample] = React.useState('');

    const handleChange1 = (event) => {
        setSize(event.target.value);
    };
    const handleChange2 = (event) => {
        setSample(event.target.value);
    };

    const [selectedOption, setSelectedOption] = useState('summary');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

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
                                <Paper elevation={5} sx={{ p: 2, display: 'flex', flexDirection: 'column', border: '1px solid #4028ca', borderRadius: '20px' }}>
                                    <FormControl component="fieldset">
                                        <RadioGroup row value={selectedOption} onChange={handleOptionChange}>
                                            <FormControlLabel value="summary" control={<Radio />} label="도서 요약본" />
                                            <FormControlLabel value="prompt" control={<Radio />} label="프롬프트 입력" />
                                        </RadioGroup>
                                    </FormControl>
                                    <Divider sx={{ my: 2, borderBottomWidth: 2, borderColor: 'primary.main' }} /> {/* Divider to separate sections */}
                                    <Box mt={4}>
                                        {selectedOption === 'summary' ? (
                                            <React.Fragment>
                                                <Typography variant="h5" component="h5" gutterBottom sx={{ pl: 1 }}>
                                                    도서 요약본 입력
                                                </Typography>
                                                <TextField
                                                    placeholder="작성하신 도서의 요약본을 입력해주세요."
                                                    multiline
                                                    rows={6}
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <Typography variant="h5" component="h5" gutterBottom sx={{ pl: 1 }}>
                                                    프롬프트 입력
                                                </Typography>
                                                <TextField
                                                    placeholder="ex) 언덕 위 나무와 오두막집"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </React.Fragment>

                                        )}
                                    </Box>
                                    <Box sx={{ minWidth: 120 }}>
                                        {/* 사이즈 선택 */}
                                        <FormControl sx={{ m: 1, minWidth: 200, backgroundColor: 'white' }}>
                                            <InputLabel id="demo-simple-select-label">이미지 사이즈</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={size}
                                                label="이미지 사이즈"
                                                onChange={handleChange1}
                                            >
                                                {imageSize.map((size) => (
                                                    <MenuItem
                                                        key={size}
                                                        value={size}
                                                    >
                                                        {size}
                                                    </MenuItem>
                                                ))}

                                            </Select>
                                        </FormControl>

                                        {/* 숫자 선택 */}
                                        <FormControl sx={{ m: 1, minWidth: 120, backgroundColor: 'white' }}>
                                            <InputLabel id="demo-simple-select-label">이미지 수</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={sample}
                                                label="이미지 수"
                                                onChange={handleChange2}
                                            >
                                                {samples.map((sample) => (
                                                    <MenuItem
                                                        key={sample}
                                                        value={sample}
                                                    >
                                                        {sample}
                                                    </MenuItem>
                                                ))}

                                            </Select>
                                        </FormControl>
                                    </Box>

                                    <Box mt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button variant="contained" color="primary">
                                            이미지 생성
                                        </Button>
                                    </Box>
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