// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Session } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    expires: string;
    uid: string | undefined;
    user: {
      email: string;
      image: string;
      name: string;
      username: string;
    };
  }
}
