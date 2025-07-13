import { signupAction } from "@/app/actions/form-action";
import AuthForm from "../AuthForm";

const RegisterPage = () => {
    return (
      <div>
        <AuthForm isSignup action={signupAction} />
      </div>
    );
}
 
export default RegisterPage;