/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';

const Suggestions: React.FC = () => {
  const [suggestion, setSugesstions] = useState<
    {
      id: number;
      username: string;
      avater: string;
      company: string;
    }[]
  >([]);

  useEffect(() => {
    const fakerResponse = [...Array(5)].map((_, index) => ({
      avater: faker.image.avatar(),
      username: faker.name.firstName(),
      company: faker.company.name(),
      id: index,
    }));

    setSugesstions(fakerResponse);
  }, []);
  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button type="submit" className="text-gray-600 font-semibold">
          See All
        </button>
      </div>

      {suggestion.map((profile) => (
        <div
          key={profile.id}
          className="flex items-center justify-between mt-3"
        >
          <img
            loading="lazy"
            src={profile.avater}
            className="w-10 h-10 rounded-full border p-[2px]"
            alt=""
          />

          <div className="flex-1 ml-4">
            <h2 className="font-semibold text-sm">{profile.username}</h2>
            <h3 className="text-xs text-gray-400  truncate">
              Works at {profile.company}
            </h3>
          </div>

          <button type="submit" className="text-blue-400 font-bold ml-4">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
