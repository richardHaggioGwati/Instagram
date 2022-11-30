import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import Story from './Story';

const Stories: React.FC = () => {
  const [suggestions, setSugesstions] = useState<
    { id: number; username: string; avater: string }[]
  >([]);
  const { data: session } = useSession();

  useEffect(() => {
    const suggestion = [...Array(20)].map((_, index) => ({
      avater: faker.image.avatar(),
      username: faker.name.firstName(),
      id: index,
    }));

    setSugesstions(suggestion);
  }, []);

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
      {session && (
        <Story
          key={session.uid}
          img={session.user.image}
          username={session.user.username}
        />
      )}

      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avater}
          username={profile.username}
        />
      ))}
    </div>
  );
};

export default Stories;
