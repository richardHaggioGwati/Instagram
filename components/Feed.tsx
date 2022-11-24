import Stories from './Stories';
import Posts from './Posts';
import MiniProfile from './MiniProfile';

const Feed: React.FC = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w3xl xl:grid-cols-3 xl:max-w-6xl mx-auto">
      {/* Section */}
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>

      {/* Section */}
      <section className="hidden xl:inline-grid md:col-span-1">
        <div className="fixed top-20">
          <MiniProfile />
        </div>
        {/* Suggestion */}
      </section>
    </main>
  );
};

export default Feed;
