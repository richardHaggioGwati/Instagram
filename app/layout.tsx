import Header from '../components/Header';
import '../css/global.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="en"
      className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide"
    >
      <head>
        <title>Instagram</title>
        <meta name="description" content="Instagram clone" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body>
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
