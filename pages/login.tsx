/* eslint-disable @next/next/no-img-element */
import Cookies from 'js-cookie';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useContext, useState } from 'react';
import { UserContext } from '../context/instaContext';

const Login: NextPage = () => {
  const [errorState, setErrorState] = useState('');
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [invalid, setInvalid] = useState(true);

  const { signIn, registerWithGoogle } = useContext(UserContext);

  const handleEmailBlur = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (emailRegex.test(emailAddress) === false) {
      setEmailError(true);
    }
  };

  const handlePasswordBlur = () => {
    if (password.length < 7) {
      setPasswordError(true);
    }
  };

  const formChange = () => {
    if (emailError === false && passwordError === false) {
      setInvalid(false);
    }
  };

  // eslint-disable-next-line consistent-return
  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    // const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    // if (emailRegex.test(emailAddress)) return setEmailError(true);
    // if (password.length === 0) return setPasswordError(true);

    try {
      signIn(emailAddress, password);
      router.push('/');
      Cookies.set('Authorization', 'true');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorState(`${error.message}`);
      }
    }
  };

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/iphone-with-profile.jpg" alt="iPhone with Instagram apps" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img src="/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4" />
          </h1>

          {errorState && (
            <p className="mb-4 text-xs text-red-500">{errorState}</p>
          )}

          <form method="POST" onSubmit={handleLogin} onChange={formChange}>
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className={`text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 ${
                emailError && 'border-2 border-rose-500'
              }`}
              onChange={({ target }) => setEmailAddress(target.value)}
              onBlur={handleEmailBlur}
              value={emailAddress}
            />
            {emailError && (
              <p className="mb-4 text-xs text-red-500">
                Please provide a correct email
              </p>
            )}
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className={`text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 ${
                passwordError && 'border-2 border-rose-500'
              }`}
              onChange={({ target }) => setPassword(target.value)}
              value={password}
              onBlur={handlePasswordBlur}
            />
            {passwordError && (
              <p className="mb-4 text-xs text-red-500">
                Password should be at least 8 characters long
              </p>
            )}
            <button
              disabled={invalid}
              type="submit"
              className={`bg-blue-400  text-white w-full rounded h-8 font-bold ${
                invalid && 'opacity-50'
              }`}
            >
              Login
            </button>
          </form>

          <p className="m-2 divide-solid">Or</p>

          <div className="w-full rounded ">
            <button
              type="submit"
              onClick={registerWithGoogle}
              className="bg-blue-400  text-white w-full rounded h-8 font-bold"
            >
              Use google
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Don&rsquo;t have an account?{` `}
            {/**
             * ! link is unable to be styled with tailwind
             */}
            <Link
              href="/signup"
              className="font-bold text-blue-500 underline-offset-[3px]"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
