import { useRef } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

import Layout from '@/components/layout';

import '@/styles/index.css';

function MyApp({ Component, pageProps }) {
  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    })
  );

  return (
    <>
      <QueryClientProvider client={queryClient.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
