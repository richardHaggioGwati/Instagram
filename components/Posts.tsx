import Post from './Post';

const DUMMY_POSTS = [
  {
    id: 123,
    username: 'David Shaw',
    userImage: 'https://links.papareact.com/3ke',
    image: 'https://links.papareact.com/3ke',
    caption: 'This is hopefully dope',
  },
  {
    id: 321,
    username: 'Insta',
    userImage: 'https://links.papareact.com/3ke',
    image: 'https://links.papareact.com/3ke',
    caption: 'This is hopefully dope',
  },
];

const Posts: React.FC = () => {
  return (
    <div>
      {DUMMY_POSTS.map((post) => (
        <Post
          key={post.id}
          username={post.username}
          userImage={post.userImage}
          image={post.image}
          caption={post.caption}
        />
      ))}
    </div>
  );
};

export default Posts;
