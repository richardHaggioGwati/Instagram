/* eslint-disable @next/next/no-img-element */
const MiniProfile: React.FC = () => {
  return (
    <div className="mt-14 ml-10 flex items-center justify-between">
      <img
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
        alt=""
        className="rounded-full border p-[2px] w-16 h16"
      />

      <div>
        <h2 className="font-bold">users</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>

      <button type="submit" className="text-blue-400 text-sm font-semibold">
        Sign Out
      </button>
    </div>
  );
};

export default MiniProfile;
