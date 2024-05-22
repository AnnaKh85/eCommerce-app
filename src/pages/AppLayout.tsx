import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
    </AuthProvider>
  );
}

export default AppLayout;
