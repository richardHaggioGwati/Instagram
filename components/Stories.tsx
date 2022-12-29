import { useContext, useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import Story from './Story';
import { UserContext } from '../context/instaContext';

const Stories: React.FC = () => {
  const [suggestions, setSuggestions] = useState<
    {
      id: number | undefined;
      username: string | undefined;
      img: string | undefined;
    }[]
  >([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const suggestion = [...Array(20)].map((_, index) => ({
      img: faker.image.avatar(),
      username: faker.name.firstName(),
      id: index,
    }));

    setSuggestions(suggestion);
  }, []);

  const userData = {
    img: `${user?.photoURL}`,
    username: user?.displayName,
  };

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
      {user && <Story key={user.uid} storyKeys={userData} />}

      {suggestions.map((profile) => (
        <Story key={profile.id} storyKeys={profile} />
      ))}
    </div>
  );
};

export default Stories;
