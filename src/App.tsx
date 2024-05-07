import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NotFoundPage from './pages/404/NotFoundPage.tsx';
import AboutUsPage from './pages/AboutUsPage.tsx';
import BasketPage from './pages/BasketPage.tsx';
import CatalogPage from './pages/CatalogPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import MainPage from './pages/MainPage.tsx';
import RegistrationPage from './pages/RegistrationPage.tsx';
import { ABOUT_US, CART_ROUTE, CATALOG_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from './utils/constants.ts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_ROUTE} element={<MainPage />} />
        <Route path={REGISTRATION_ROUTE} element={<RegistrationPage />} />
        <Route path={LOGIN_ROUTE} element={<LoginPage />} />
        <Route path={CATALOG_ROUTE} element={<CatalogPage />} />
        <Route path={ABOUT_US} element={<AboutUsPage />} />
        <Route path={CART_ROUTE} element={<BasketPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
