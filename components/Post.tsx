/* eslint-disable react/no-array-index-key */
import {
  PaperAirplaneIcon,
  HeartIcon,
  BookmarkIcon,
  FaceSmileIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HearIconSolid } from '@heroicons/react/24/solid';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useState, FormEvent, useEffect } from 'react';
import { firebaseDB } from '../lib/firebase';

/* eslint-disable @next/next/no-img-element */
interface PostProps {
  post: {
    username: string;
    profileImage: string;
    image: string;
    caption: string;
    id?: string;
  };
  identifier: string;
}

const Post: React.FC<PostProps> = ({
  post: { username, profileImage, image, caption },
  identifier,
}) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<{}[]>([]);
  const [likes, setLikes] = useState<{ id?: string }[]>([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(firebaseDB, `posts/${identifier}/comments`),
          orderBy('timeStamp', 'desc'),
        ),
        (snapshot) => setComments(snapshot.docs),
      ),
    [identifier],
  );

  useEffect(
    () =>
      onSnapshot(
        collection(firebaseDB, `posts/${identifier}/likes`),
        (snapshot) => setLikes(snapshot.docs),
      ),
    [identifier],
  );

  useEffect(
    () =>
      setHasLiked(likes.findIndex((like) => like.id === session?.uid) !== -1),
    [likes, session?.uid],
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(
        doc(firebaseDB, `posts/${identifier}/likes`, `${session?.uid}`),
      );
    } else {
      await setDoc(
        doc(firebaseDB, `posts/${identifier}/likes`, `${session?.uid}`),
        {
          username: session?.user.username,
        },
      );
    }
  };

  const sendComment = async (event: FormEvent) => {
    event.preventDefault();

    const commentToSend = comment;

    setComment('');

    await addDoc(collection(firebaseDB, `posts/${identifier}/comments`), {
      comment: commentToSend,
      username: session?.user.username,
      userImage: session?.user.image,
      timeStamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white my-7 border rounded-sm">
      <div className="flex items-center p-5">
        <img
          src={profileImage}
          alt="profile"
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
        />
        <p className="flex-1 font-bold">{username}</p>
        <EllipsisHorizontalIcon className="h-5" />
      </div>

      <img src={image} alt="" className="object-cover w-full" loading="lazy" />

      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HearIconSolid onClick={likePost} className="btn text-red-600" />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <PaperAirplaneIcon className="btn" />
            <ChatBubbleOvalLeftEllipsisIcon className="btn" />
          </div>

          <BookmarkIcon className="btn" />
        </div>
      )}

      <p className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mr-1"> {likes.length} likes</p>
        )}
        <span className="font-bold mr-1">{username} </span> {caption}
      </p>

      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((com: any, index) => (
            <div
              key={`${index} ${Math.random}`}
              className="flex items-center space-x-2 mb-3"
            >
              <img
                src={com.data().userImage}
                alt=""
                className="h-7 rounded-full"
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{com.data().username}</span>{' '}
                {com.data().comment}
              </p>
            </div>
          ))}
        </div>
      )}

      {session && (
        <form className="flex items-center p-4">
          <FaceSmileIcon className="h-7" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
