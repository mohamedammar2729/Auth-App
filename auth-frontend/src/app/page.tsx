'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-900 to-black text-white'>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='max-w-lg text-center p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg'
      >
        <h1 className='text-4xl font-bold'>Secure Authentication </h1>
        <p className='mt-4 text-gray-300'>
          Effortless login with modern security features.
        </p>
        <div className='mt-6 flex justify-center gap-4'>
          <Link
            className='px-6 py-2 bg-blue-600 hover:bg-blue-500 transition rounded-xl'
            href={'/login'}
          >
            Login
          </Link>

          <Link
            className='px-6 py-2 bg-green-600 hover:bg-green-500 transition rounded-xl'
            href={'/register'}
          >
            Register
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
