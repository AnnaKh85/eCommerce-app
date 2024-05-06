import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NotFoundPage from './pages/404/NotFoundPage.tsx';
import AboutUsPage from './pages/AboutUsPage.tsx';
import BasketPage from './pages/BasketPage.tsx';
import CatalogPage from './pages/CatalogPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import MainPage from './pages/MainPage.tsx';
import RegistrationPage from './pages/RegistrationPage.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="aboutUs" element={<AboutUsPage />} />
        <Route path="cart" element={<BasketPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
