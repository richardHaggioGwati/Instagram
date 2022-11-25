/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import HomeIcon from './Icons/Home';
import MenuIcon from './Icons/MenuIcon';
import SearchIcon from './Icons/SearchIcon';
import PaperAirPlane from './Icons/PaperAirPlane';
import PlusCircleIcon from './Icons/PlusCircleIcon';
import UserGroupIcon from './Icons/UserGroupIcon';
import HeartIcon from './Icons/HeartIcon';

const Header = () => {
  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        {/*  left */}
        <div className="relative hidden lg:inline-grid w-24 cursor-pointer">
          <Image
            className="object-contain"
            src="https://links.papareact.com/ocw"
            alt="instagram logo"
            fill
          />
        </div>
        <div className="relative lg:hidden w-10 flex-shrink-0 cursor-pointer">
          <Image
            className="object-contain"
            src="https://links.papareact.com/jjm"
            alt="instagram logo"
            fill
          />
        </div>

        {/*  center */}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 pt-5 flxe items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="bg-grey-50 block w-full pl-10 sm:text-sm border-gray-300 focus:border-black focus:ring-black rounded-md"
              placeholder="Search"
              type="text"
            />
          </div>
        </div>

        {/*  right md:hidden */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="navBtn" />
          <MenuIcon className="h-6 cursor-pointer lg:hidden" />
          <div className="relative navBtn">
            <PaperAirPlane className="navBtn" />
            <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">
              3
            </div>
          </div>
          <PlusCircleIcon className="navBtn" />
          <UserGroupIcon className="navBtn" />
          <HeartIcon className="navBtn" />
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            className="h-10 rounded-full cursor-pointer"
            alt="profile"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
