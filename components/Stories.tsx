import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import Story from './Story';

const Stories: React.FC = () => {
  const [suggestions, setSugesstions] = useState<
    {
      id: number | undefined;
      username: string | undefined;
      img: string | undefined;
    }[]
  >([]);
  const { data: session } = useSession();

  useEffect(() => {
    const suggestion = [...Array(20)].map((_, index) => ({
      img: faker.image.avatar(),
      username: faker.name.firstName(),
      id: index,
    }));

    setSugesstions(suggestion);
  }, []);

  const sessionData = {
    img: session?.user.image,
    username: session?.user.name,
  };

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
      {session && <Story key={session.uid} storyKeys={sessionData} />}

      {suggestions.map((profile) => (
        <Story key={profile.id} storyKeys={profile} />
      ))}
    </div>
  );
};

export default Stories;
