import { USERPROFILETYPE } from '../context/instaContext';

/* eslint-disable @next/next/no-img-element */
interface StoryProps {
  storyKeys: {
    img: string | undefined;
    username: USERPROFILETYPE;
    id?: number | undefined;
  };
}

const Story: React.FC<StoryProps> = ({ storyKeys: { img, username, id } }) => {
  return (
    <div>
      <img
        className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 cursor-pointer hover:scale-110 transition-colors transform duration-200 ease-out"
        src={img}
        alt={`profile ${id}`}
      />
      <p className="text-xs w-14 truncate text-center">{username}</p>
    </div>
  );
};

export default Story;
