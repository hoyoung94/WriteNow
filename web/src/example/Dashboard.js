import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Chart from '../Chart';
import Deposits from './Deposits';
import RankTable from './Table';
import ResponsiveAppBar from '../ResponsiveAppBar';
import Button from '@mui/material/Button';


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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper
        sx={{
          width: '100%',
        }}>
        <ResponsiveAppBar />
      </Paper>
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '500px', justifyContent: 'center' }}>
                  <Typography
                    variant="h1"
                    noWrap
                    component="h1">
                    Write Now!
                  </Typography>
                  <Typography
                    variant="h4"
                    noWrap
                    component="h4">
                    당신의 이야기에 상상을 더해보세요!
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '500px', justifyContent: 'center' }}>
                  <Typography
                    variant="h4"
                    noWrap
                    component="h4">
                    원하는 디자인의 책 표지를 생성할 수 있어요 📘
                  </Typography>
                  <Typography
                    variant="h4"
                    noWrap
                    component="h4">
                    키워드를 검색하여 최근 도서 트렌드를 확인할 수 있어요 🤗
                  </Typography>
                  <Typography
                    variant="h4"
                    noWrap
                    component="h4">
                    베스트 셀러 점수를 예측해 볼 수 있어요 📊
                  </Typography>
                  <Button variant="contained">지금 시작하기</Button>

                </Paper>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>

              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    justifyContent: 'center',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <RankTable />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
