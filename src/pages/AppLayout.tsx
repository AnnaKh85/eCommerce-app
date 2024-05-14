import { Outlet, useNavigation } from 'react-router-dom';

import Loader from '../components/loader/Loader.tsx';
import TopNav from '../components/TopNav/TopNav.tsx';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <>
      {isLoading && <Loader />}
      <TopNav />
      <main>
        <Outlet />
      </main>
      {/*<footer>Footer</footer>*/}
    </>
  );
}

export default AppLayout;
