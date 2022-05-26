import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';
import Head from 'next/dist/shared/lib/head';
import { parseCookies } from 'nookies';
import { UserApi } from '../utils/api/user';
import { setUserData } from '../redux/slices/user';
import '../styles/globals.scss';
import 'macro-css';

import { Header } from '../components/Header';
import { theme } from '../theme';
import { store, wrapper } from '../redux/store';
import { Api } from '../utils/api';
function MyApp({ Component, pageProps }) {
  return (
    <MuiThemeProvider theme={theme}>
      <Head>
        <title>RJournal</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"></link>
      </Head>
      <CssBaseline />
      <Header />
      <Component {...pageProps} />
    </MuiThemeProvider>
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => {
  return async ({ ctx, Component }) => {
    try {
      const userData = await Api(ctx).user.getUser();
      store.dispatch(setUserData(userData))
    } catch (error) {
      if (ctx.asPath === '/write') {
        ctx.res?.writeHead(302, {
          Location: '/404'
        })
        ctx.res?.end()
      }
    }
    return {
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {}),
      },
    }
  }
})

export default wrapper.withRedux(MyApp);
