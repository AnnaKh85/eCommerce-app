import './App.css';

import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Error from './pages/404/Error.tsx';
import NotFoundPage from './pages/404/NotFoundPage.tsx';
import AboutUsPage from './pages/AboutUsPage.tsx';
import AppLayout from './pages/AppLayout.tsx';
import BasketPage from './pages/BasketPage.tsx';
import CatalogPage from './pages/CatalogPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import MainPage from './pages/MainPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import RegistrationPage from './pages/RegistrationPage.tsx';
import {
  ABOUT_US,
  CART_ROUTE,
  CATALOG_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
} from './services/constants.ts';
import { generateAnonymousToken, getAdminBearerToken } from './utils/getAdminToken.ts';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFoundPage />,

    children: [
      {
        path: HOME_ROUTE,
        element: <MainPage />,
        errorElement: <Error />,
      },
      {
        path: REGISTRATION_ROUTE,
        element: <RegistrationPage />,
        errorElement: <Error />,
      },
      {
        path: LOGIN_ROUTE,
        element: <LoginPage />,
        errorElement: <Error />,
      },
      {
        path: CATALOG_ROUTE,
        element: <CatalogPage />,
        errorElement: <Error />,
      },
      {
        path: ABOUT_US,
        element: <AboutUsPage />,
        errorElement: <Error />,
      },
      {
        path: CART_ROUTE,
        element: <BasketPage />,
        errorElement: <Error />,
      },
      {
        path: PROFILE_ROUTE,
        element: <ProfilePage />,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    const fetchAndStoreToken = async () => {
      const token = await getAdminBearerToken();
      localStorage.setItem('adminToken', token);
      setIsToken(true);
    };
    fetchAndStoreToken();

    const setAnonymousToken = async () => {
      const response = await generateAnonymousToken();
      sessionStorage.setItem('anonymousToken', response);
      return response;
    };
    setAnonymousToken();
  }, []);

  return <>{isToken && <RouterProvider router={router} />}</>;
}

export default App;
