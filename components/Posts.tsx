import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import Post from './Post';

interface DummyResponse {
  username: string;
  userImage: string;
  image: string;
  caption: string;
  id: number;
}

const Posts: React.FC = () => {
  const [fakerResponse, setfakerResponse] = useState<DummyResponse[]>([]);

  useEffect(() => {
    const dummyPosts = [...Array(3)].map((_, index) => ({
      userImage: faker.image.avatar(),
      username: faker.name.firstName(),
      image: faker.image.abstract(),
      caption: faker.random.words(6),
      id: index,
    }));

    setfakerResponse(dummyPosts);
  }, []);

  return (
    <div>
      {fakerResponse?.map((post) => (
        <Post key={post.id} postProps={post} />
      ))}
    </div>
  );
};

export default Posts;
