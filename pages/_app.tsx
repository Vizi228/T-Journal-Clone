import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from '../theme';
import '../styles/globals.scss';
import 'macro-css';
import { Header } from '../components/Header';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { AppProps } from 'next/dist/shared/lib/router/router';

function MyApp({ Component, pageProps }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
      </Provider>
    </MuiThemeProvider>
  );
}

export default MyApp;
