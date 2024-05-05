import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage.tsx';
import MainPage from './pages/MainPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import RegistrationPage from './pages/RegistrationPage.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
