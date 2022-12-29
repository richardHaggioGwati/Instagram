/* eslint-disable jsx-a11y/alt-text */
import { useRecoilState } from 'recoil';
import { Dialog, Transition } from '@headlessui/react';
import { CameraIcon } from '@heroicons/react/24/outline';
import { Fragment, useContext, useRef, useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { firebaseDB, firebaseStorage } from '../lib/firebase';
import modalState from '../atoms/modalAtom';
import { UserContext } from '../context/instaContext';

const Modal: React.FC = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef<HTMLInputElement>(null);
  const captionRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [selectedFile, setSelectedFile] = useState<any>();

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);
    const docRef = await addDoc(collection(firebaseDB, 'posts'), {
      username: user.displayName,
      caption: captionRef.current?.value,
      profileImage: user.photoURL,
      timeStamp: serverTimestamp(),
    });

    const imageRef = ref(firebaseStorage, `posts/${docRef.id}/image`);

    // add suspense if needed in future
    await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
      const downloadUrl = await getDownloadURL(imageRef);

      await updateDoc(doc(firebaseDB, 'posts', docRef.id), {
        image: downloadUrl,
      });
    });

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
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
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-in duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block  sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom max-w-md bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform translate-all sm:my-8 sm:align-middle sm:mx-w-sm sm:w-full sm:p-6">
              <div>
                {selectedFile ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selectedFile}
                    className="w-full object-contain cursor-pointer"
                    alt=""
                  />
                ) : (
                  <div
                    onClick={() => filePickerRef.current?.click()}
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                  >
                    <CameraIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Upload a photo
                  </Dialog.Title>

                  <div>
                    <input
                      type="file"
                      hidden
                      ref={filePickerRef}
                      onChange={addImageToPost}
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <input
                    ref={captionRef}
                    type="text"
                    className="border-none focus:ring-0 w-full text-center"
                  />
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    disabled={!selectedFile}
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm bg-red-600 px-4 py-2 text-base font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                    onClick={uploadPost}
                  >
                    {loading ? 'Uploading post ...' : 'Upload Post'}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
