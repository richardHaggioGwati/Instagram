import { useSession, signOut } from 'next-auth/react';
import { FormEvent } from 'react';

/* eslint-disable @next/next/no-img-element */
const MiniProfile: React.FC = () => {
  const { data: session } = useSession();

  const handleSignOut = (event: FormEvent) => {
    event?.preventDefault();
    signOut();
  };

  return (
    <div className="mt-14 ml-10 flex items-center justify-between">
      <img
        src={session?.user?.image}
        alt=""
        className="rounded-full border p-[2px] w-16 h16"
      />

      <div className="flex-1 mx-4">
        <h2 className="font-bold">{session?.user?.username}</h2>
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
