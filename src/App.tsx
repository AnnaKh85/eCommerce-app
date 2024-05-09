import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Error from './pages/404/Error.tsx';
import NotFoundPage from './pages/404/NotFoundPage.tsx';
import AboutUsPage from './pages/AboutUsPage.tsx';
import AppLayout from './pages/AppLayout.tsx';
import BasketPage from './pages/BasketPage.tsx';
import CatalogPage from './pages/CatalogPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import MainPage, { customerLoader } from './pages/MainPage.tsx';
import RegistrationPage from './pages/RegistrationPage.tsx';
import {
  ABOUT_US,
  CART_ROUTE,
  CATALOG_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
} from './services/constants.ts';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFoundPage />,

    children: [
      {
        path: HOME_ROUTE,
        element: <MainPage />,
        errorElement: <Error />,
        loader: customerLoader,
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
