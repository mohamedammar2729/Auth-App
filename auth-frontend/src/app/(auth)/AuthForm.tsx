'use client';
import { useActionState } from 'react';

const inputStyle = ' px-2 py-1  bg-gray-100 rounded-lg';
type props = {
  isSignup: boolean;
  action: (prevState: unknown, f: FormData) => Promise<unknown>;
};

const AuthForm = ({ isSignup, action }: props) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const [state, formAction] = useActionState(action, undefined);
  return (
    <section className='w-full h-screen flex flex-col  '>
      <form
        action={formAction}
        className='flex flex-col m-auto justify-center items-center border-4 rounded-lg p-4 gap-3 '
      >
        {JSON.stringify(state)}
        <h4 className='text-3xl py-3'>
          {isSignup ? 'Register' : 'Login'} from here!
        </h4>
        {isSignup && (
          <>
            <label className='text-sm font-light my-4' htmlFor='name'>
              Name
            </label>
            <input type='text' id='name' name='name' className={inputStyle} />
          </>
        )}

        <label className='text-sm font-light my-4' htmlFor='email'>
          Email
        </label>
        <input type='email' id='email' name='email' className={inputStyle} />

        <label className='text-sm font-light my-4' htmlFor='password'>
          Password
        </label>
        <input
          type='password'
          id='password'
          name='password'
          className={inputStyle}
        />
        <button className='bg-slate-300 rounded-lg px-4 py-2 hover:bg-slate-200'>
          {isSignup ? 'Register' : 'Login'}
        </button>
      </form>
    </section>
  );
};

export default AuthForm;
