import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet, useNavigation } from 'react-router-dom';

import Footer from '../components/footer/Footer.tsx';
import Loader from '../components/loader/Loader.tsx';
import { AuthProvider } from '../components/login/AuthContext.tsx';
import TopNavResp from '../components/TopNav/TopNavResp.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('cartId');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {isLoading && <Loader />}
        <TopNavResp />
        <main style={{ marginTop: '50px' }}>
          <Outlet />
        </main>
        <Footer />
      </QueryClientProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '350px',
            padding: '16px 24px',
            background: 'var(--color-white)',
            color: 'var(--color-dark-primary)',
            borderRadius: '8px',
          },
        }}
      />
    </AuthProvider>
  );
}

export default AppLayout;
