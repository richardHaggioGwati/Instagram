import { FormEvent, useContext } from 'react';
import { UserContext } from '../context/instaContext';

/* eslint-disable @next/next/no-img-element */
const MiniProfile: React.FC = () => {
  const { user, logout } = useContext(UserContext);

  const handleSignOut = (event: FormEvent) => {
    event?.preventDefault();
    logout();
  };

  return (
    <div className="mt-14 ml-10 flex items-center justify-between">
      <img
        src={user.photoURL}
        alt=""
        className="rounded-full border p-[2px] w-20 h-20"
      />

      <div className="flex-1 mx-4">
        <h2 className="font-bold">{user.displayName}</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>

      <button
        onClick={handleSignOut}
        type="submit"
        className="text-blue-400 text-sm font-semibold"
      >
        Sign Out
      </button>
    </div>
  );
};

export default MiniProfile;
