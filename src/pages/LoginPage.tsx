import LoginForm from '../components/login/Login.tsx';
import TopNav from '../components/TopNav/TopNav.tsx';
import TopNavLinks from '../components/TopNav/TopNavLinks.tsx';

function LoginPage() {
  return (
    <>
      <TopNav />
      <TopNavLinks />
      <h2>LoginPage</h2>
      <LoginForm />
    </>
  );
}

export default LoginPage;
