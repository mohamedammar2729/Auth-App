'use client';
import React, { useActionState } from 'react';
import { motion } from 'framer-motion';

const inputStyle =
  'w-full px-4 py-2  bg-white/10 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200';
type props = {
  isSignup: boolean;
  action: (prevState: unknown, f: FormData) => Promise<unknown>;
};
const AuthForm = ({ isSignup, action }: props) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const [state, formAction] = useActionState(action, undefined);
  console.log(state);

  return (
    <section className='w-full h-screen flex flex-col bg-gradient-to-r from-gray-900 to-black text-white  '>
      <motion.form
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        action={formAction}
        className='flex flex-col m-auto justify-center items-center bg-white/10 backdrop-blur-lg border  border-white/20 shadow-lg rounded-2xl p-6 gap-4 w-80'
      >
        <motion.h4
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='text-3xl font-semibold'
        >
          {isSignup ? 'Register' : 'Login'} from here!
        </motion.h4>
        {isSignup && (
          <motion.div
            className='w-full'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className='text-sm font-light my-4' htmlFor='name'>
              Name
            </label>
            <input type='text' id='name' name='name' className={inputStyle} />
          </motion.div>
        )}
        <motion.div
          className='w-full'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className='text-sm font-light my-4' htmlFor='email'>
            Email
          </label>
          <input type='email' id='email' name='email' className={inputStyle} />
        </motion.div>
        <motion.div
          className='w-full'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label className='text-sm font-light my-4' htmlFor='password'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            className={inputStyle}
          />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className='w-full mt-4 py-2 bg-blue-600 hover:bg-blue-500 transition-all duration-200 text-white rounded-lg shadow-md hover:shadow-lg'
        >
          {isSignup ? 'Register' : 'Login'}
        </motion.button>
      </motion.form>
    </section>
  );
};

export default AuthForm;
