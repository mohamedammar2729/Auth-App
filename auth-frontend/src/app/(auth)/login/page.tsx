import { loginAction } from '@/app/actions/form-action';
import AuthForm from '../AuthForm';

const LoginPage = () => {
  return (
    <div>
      <AuthForm isSignup={false} action={loginAction} />
    </div>
  );
};

export default LoginPage;
