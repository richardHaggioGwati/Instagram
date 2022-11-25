import Post from './Post';

const DUMMY_POSTS = [
  {
    id: 123,
    username: 'David Shaw',
    userImage:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    caption: 'This is hopefully dope',
  },
  {
    id: 321,
    username: 'Insta',
    userImage:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
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
