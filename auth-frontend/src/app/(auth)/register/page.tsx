import { signupAction } from "@/app/actions/form-action";
import AuthForm from "../AuthForm";

const RegisterPage = () => {
    return (
      <div>
        <AuthForm isSignup={false} action={signupAction} />
      </div>
    );
}
 
export default RegisterPage;