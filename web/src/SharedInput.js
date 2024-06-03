import React, { useState } from 'react';
import { ThemeProvider, Container, Grid, Box, CssBaseline, Paper, Typography, TextField, Button } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { styled, createTheme } from '@mui/material/styles';
import RelatedBooks from './SearchTable';
import RelatedKeyword from './KeywordTable';
import TestChart from './Chart';

const defaultTheme = createTheme();

const queryClient = new QueryClient();

const SharedInputComponent = () => {
    const [query, setQuery] = useState('');
    const [submittedQuery, setSubmittedQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setQuery(e.target.elements.query.value);
        setSubmittedQuery(e.target.elements.query.value);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <QueryClientProvider client={queryClient}>
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
                                <Grid item xs={12}>
                                    <Paper elevation={5} sx={{ p: 2, display: 'flex', flexDirection: 'column', backgroundColor: '#EEF3FF', borderRadius: '20px' }}>
                                        <Typography variant="h5" component="h5" gutterBottom sx={{ pl: 1 }}>
                                            키워드 검색
                                        </Typography>
                                        <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: '20px' }}>
                                            <TextField
                                                name="query"
                                                type="text"
                                                variant="outlined"
                                                placeholder="키워드 입력"
                                                fullWidth
                                                style={{ marginRight: '10px', backgroundColor: 'white' }}
                                            />
                                            <Button type="submit" variant="contained" color="primary">
                                                검색
                                            </Button>
                                        </form>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>
                        {submittedQuery && (
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
                                                {submittedQuery}의 최근 12개월간의 관심도 변화
                                            </Typography>
                                            <TestChart query={submittedQuery} />
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Container>
                        )}
                        {submittedQuery && (
                            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={8}> {/* Adjust the size as needed */}
                                        <RelatedBooks query={query} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}> {/* Adjust the size as needed */}
                                        <RelatedKeyword query={query} />
                                    </Grid>
                                </Grid>
                            </Container>
                        )}
                    </Box>
                </Box>
            </QueryClientProvider>
        </ThemeProvider>
    );
};

export default SharedInputComponent;
