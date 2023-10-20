'use client';

import { useSupabse } from '@/app/hooks/use-supabse';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

function LoginForm() {
  const router = useRouter();
  const supabase = useSupabse();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.supabse.auth.onAuthStateChange(() => {
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  const signIn = () => {
    supabase.supabse.auth.signInWithPassword({
      email: email,
      password: password,
    });
    router.refresh();
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form>
      <input
        className={' mb-7 w-full border border-gray-600/20 p-3 outline-none'}
        autoComplete="auto"
        placeholder="Email"
        required
        value={email}
        onChange={handleEmailChange}
      />

      <input
        type="password"
        className={' mb-7 w-full border border-gray-600/20 p-3 outline-none'}
        autoComplete="auto"
        placeholder="Password"
        required
        value={password}
        onChange={handlePasswordChange}
      />
      <div className={'flex w-full flex-row items-center justify-between'}>
        <Link href={'#'} className={'text-gray-500 hover:text-orange-600'}>
          <span className={'text-md'}>Forgot Your Password?</span>
        </Link>
        <button
          type="submit"
          className={'items-center bg-orange-600 px-6 py-3 text-white'}
          onClick={signIn}
        >
          <span>LOGIN</span>
        </button>
      </div>
    </form>
  );
}
export default LoginForm;
