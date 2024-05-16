import { Outlet, useNavigation } from 'react-router-dom';

import Footer from '../components/footer/Footer.tsx';
import Loader from '../components/loader/Loader.tsx';
import { AuthProvider } from '../components/login/AuthContext.tsx';
import TopNav from '../components/TopNav/TopNav.tsx';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <AuthProvider>
      <>
        {isLoading && <Loader />}
        <TopNav />
        <main>
          <Outlet />
        </main>
        <Footer />
      </>
    </AuthProvider>
  );
}

export default AppLayout;
