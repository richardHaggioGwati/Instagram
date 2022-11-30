import BookMark from './Icons/BookMark';
import ChatIcon from './Icons/ChatIcon';
import DotsHorizontal from './Icons/DotsHorizontal';
import EmojiHappy from './Icons/EmojiHappy';
import HeartIcon from './Icons/HeartIcon';
import PaperAirPlane from './Icons/PaperAirPlane';

/* eslint-disable @next/next/no-img-element */
interface PostProps {
  username: string;
  userImage: string;
  image: string;
  caption: string;
}

const Post: React.FC<PostProps> = ({ username, userImage, image, caption }) => {
  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          src={userImage}
          alt="profile"
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontal className="h-5" />
      </div>

      {/* img */}
      <img src={image} alt="" className="object-cover w-full" loading="lazy" />

      {/* buttons */}
      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4">
          <HeartIcon className="btn" />
          <PaperAirPlane className="btn" />
          <ChatIcon className="btn" />
        </div>

        <BookMark className="btn" />
      </div>

      {/* caption */}
      <p className="p-5 truncate">
        <span className="font-bold mr-1">{username} </span> {caption}
      </p>
      {/* comments */}

      {/* input box */}
      <form className="flex items-center p-4">
        <EmojiHappy className="h-7" />
        <input
          type="text"
          placeholder="Add a comment..."
          className="border-none flex-1 focus:ring-0 outline-none"
        />
        <button type="submit" className="font-semibold text-blue-400">
          Post
        </button>
      </form>
    </div>
  );
};

export default Post;
