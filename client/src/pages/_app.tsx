import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ManagedUIContext } from '@contexts/ui.context';
import ManagedModal from '@components/common/modal/managed-modal';
import ManagedDrawer from '@components/common/drawer/managed-drawer';
import { useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from 'react-query/devtools';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from '@components/seo/default-seo';
import { CookiesProvider, useCookies } from 'react-cookie';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

// external

// base css file
import '@assets/css/scrollbar.css';
import '@assets/css/swiper-carousel.css';
import '@assets/css/custom-plugins.css';
import '@assets/css/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { getDirection } from '@utils/get-direction';

const Noop: React.FC = ({ children }) => <>{children}</>;

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<any>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const router = useRouter();
  const dir = getDirection(router.locale);
  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);
  const Layout = (Component as any).Layout || Noop;

  const [cookies, setCookie] = useCookies(['user']);
  function handleLogin(user: any) {
    setCookie('user', user, { path: '/' });
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <PayPalScriptProvider
        options={{
          clientId:
            'AaHw48SxjwQ5fd_vnuRY4AsibkBn0qWx-7Usnp4yglQ3UGN7ISqP698t0-llTGnyidB0eqeAJVaIJDYa',
        }}
      >
        <Hydrate state={pageProps.dehydratedState}>
          {' '}
          <GoogleOAuthProvider clientId="74472575659-u08deub6ejrgjqied21q0ucikd0qjrgh.apps.googleusercontent.com">
            <ManagedUIContext>
              <CookiesProvider>
                <>
                  <DefaultSeo />
                  {router.pathname === '/' ? (
                    <Component
                      {...pageProps}
                      key={router.route}
                      baseData={{ handleLogin, cookies }}
                    />
                  ) : (
                    <Layout pageProps={pageProps}>
                      <Component
                        {...pageProps}
                        key={router.route}
                        baseData={{ handleLogin, cookies }}
                      />
                    </Layout>
                  )}
                  <ToastContainer position="top-center" />
                  <ManagedModal baseData={{ handleLogin, cookies }} />
                  <ManagedDrawer />
                </>
              </CookiesProvider>
            </ManagedUIContext>
          </GoogleOAuthProvider>{' '}
        </Hydrate>
      </PayPalScriptProvider>

      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
};

export default appWithTranslation(CustomApp);
