/* eslint-disable @next/next/no-img-element */
import { FormEvent, useContext } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import {
  HomeIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  MagnifyingGlassIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import instagram from '../public/logo.png';
import instagramMobile from '../public/insta-mobile.png';
import modalState from '../atoms/modalAtom';
import { UserContext } from '../context/instaContext';

const Header: React.FC = () => {
  const { user, logout } = useContext(UserContext);
  const router = useRouter();

  const [open, setOpen] = useRecoilState(modalState);

  const handleSignOut = (event: FormEvent) => {
    event?.preventDefault();
    router.push('/login');
    logout();
  };
  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        <div
          onClick={() => router.push('/')}
          className="relative hidden lg:inline-grid w-24 cursor-pointer"
        >
          <Image
            className="object-contain"
            src={instagram}
            alt="instagram logo"
            layout="fill"
            priority
          />
        </div>
        <div
          onClick={() => router.push('/')}
          className="relative lg:hidden w-10 flex-shrink-0 cursor-pointer"
        >
          <Image
            className="object-contain"
            src={instagramMobile}
            alt="instagram logo"
            layout="fill"
            priority
          />
        </div>

        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 pt-5 items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="bg-grey-50 block w-full pl-10 sm:text-sm border-gray-300 focus:border-black focus:ring-black rounded-md"
              placeholder="Search"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <HomeIcon onClick={() => router.push('/')} className="navBtn" />
          {user ? (
            <>
              <PlusCircleIcon
                className="h-7 cursor-pointer lg:hidden"
                onClick={() => setOpen(!open)}
              />
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn" />
                <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">
                  3
                </div>
              </div>
              <PlusCircleIcon
                className="navBtn"
                onClick={() => setOpen(!open)}
              />
              <ArrowLeftOnRectangleIcon
                className="navBtn"
                onClick={handleSignOut}
              />

              <img
                onClick={() => router.push('/account')}
                src={`${user.photoURL}`}
                className="h-10 w-10 rounded-full cursor-pointer"
                alt="profile"
              />
            </>
          ) : (
            <button type="button" onClick={() => router.push('/login')}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
