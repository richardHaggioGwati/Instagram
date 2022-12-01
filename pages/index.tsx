import type { NextPage } from 'next';
import Header from '../components/Header';
import Feed from '../components/Feed';
import Modal from '../components/Modal';

const Home: NextPage = () => {
  return (
    <>
      <Modal />
      <Header />
      <Feed />
    </>
  );
};

export default Home;
