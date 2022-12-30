/* eslint-disable @next/next/no-img-element */
import { useRef, useState, FormEvent, useContext } from 'react';
import { CameraIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import Cookies from 'js-cookie';
import HashLoader from 'react-spinners/HashLoader';
import { UserContext } from '../context/instaContext';
import { firebaseDB, firebaseStorage } from '../lib/firebase';

const Signup: React.FC = () => {
  const router = useRouter();

  const filePickerRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<any>();
  const [downloadImage, setDownloadImage] = useState('');

  const [loading, setLoading] = useState(false);

  const [emailAddress, setEmailAddress] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [errorState, setErrorState] = useState('');

  const { createUser, registerWithGoogle } = useContext(UserContext);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const modifiedUsername = username.toLowerCase().replace(/\s/g, '');

      const docRef = await addDoc(collection(firebaseDB, 'user'), {
        username: modifiedUsername,
        fullName,
        timeStamp: serverTimestamp(),
      });

      const imageRef = ref(firebaseStorage, `user/${docRef.id}/image`);

      await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
        const downloadUrl = await getDownloadURL(imageRef);

        setDownloadImage(downloadUrl);

        await updateDoc(doc(firebaseDB, 'user', docRef.id), {
          image: downloadUrl,
        });
        Cookies.set('Authorization', 'true');
      });
      await createUser(emailAddress, password, modifiedUsername, downloadImage);
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorState(`${error.message}`);
      }
    }
    setLoading(false);
  };

  const addImageToPost = (event: any) => {
    event.preventDefault();
    const reader = new FileReader();
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target?.result);
    };
  };

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/iphone-with-profile.jpg" alt="iPhone with Instagram app" />
      </div>
      <div className="flex flex-col w-2/5">
        {loading && (
          <HashLoader
            color="rgba(136, 64, 189, 1)"
            loading={loading}
            size={100}
            speedMultiplier={0.6}
          />
        )}
        {!loading && (
          <>
            <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
              <h1 className="flex justify-center w-full">
                <img
                  src="/logo.png"
                  alt="Instagram"
                  className="mt-2 w-6/12 mb-4"
                />
              </h1>

              {errorState && (
                <p className="mb-4 text-xs text-red-500">{errorState}</p>
              )}
              <form onSubmit={submitHandler}>
                {selectedFile ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <div className="flex items-center justify-center">
                    <img
                      src={selectedFile}
                      className="object-contain rounded-lg w-32 mb-4 mx-auto shadow-2xl"
                      alt=""
                    />
                  </div>
                ) : (
                  <>
                    <div
                      onClick={() => filePickerRef.current?.click()}
                      className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                    >
                      <CameraIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="text-lg leading-6 text-center font-medium text-gray-900">
                      Upload a photo
                    </div>
                  </>
                )}

                <div className="mt-1 mb-3 text-center sm:mt-3">
                  <div>
                    <input
                      type="file"
                      required
                      hidden
                      ref={filePickerRef}
                      onChange={addImageToPost}
                    />
                  </div>
                </div>
                <input
                  required
                  aria-label="Enter your username"
                  type="text"
                  placeholder="Username"
                  className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                  onChange={({ target }) => setUsername(target.value)}
                  value={username}
                />
                <input
                  required
                  aria-label="Enter your full name"
                  type="text"
                  placeholder="Full name"
                  className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                  onChange={({ target }) => setFullName(target.value)}
                  value={fullName}
                />
                <input
                  required
                  aria-label="Enter your email address"
                  type="text"
                  placeholder="Email address"
                  className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                  onChange={({ target }) => setEmailAddress(target.value)}
                  value={emailAddress}
                />
                <input
                  required
                  aria-label="Enter your password"
                  type="password"
                  placeholder="Password"
                  className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                  onChange={({ target }) => setPassword(target.value)}
                  value={password}
                />
                <button
                  type="submit"
                  className="text-white w-full bg-blue-400 rounded h-8 font-bold"
                  //   ${isInvalid && 'opacity-50'}`}
                  //   disabled={isInvalid}
                >
                  Sign Up
                </button>
              </form>

              <p className="m-2 divide-solid">Or</p>

              <div className="w-full rounded ">
                <button
                  type="button"
                  onClick={registerWithGoogle}
                  className="bg-blue-400  text-white w-full rounded h-8 font-bold"
                >
                  Use google
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
              <p className="text-sm">
                Have an account?{` `}
                <Link href="/login" className="font-bold text-blue-medium">
                  Login
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
