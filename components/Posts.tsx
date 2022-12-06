import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Post from './Post';
import { firebaseDB } from '../lib/firebase';

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<any>([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(firebaseDB, 'posts'), orderBy('timeStamp', 'desc')),
        (snapshot) => {
          setPosts(snapshot.docs);
        },
      ),
    [],
  );

  return (
    <div>
      {posts.map((post: any) => (
        <Post key={post.id} identifier={post.id} post={post.data()} />
      ))}
    </div>
  );
};

export default Posts;
