import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

declare module "next-auth" {
  interface Session {
    access_token: string;
    refresh_token: string;
    user: IUser;
  }

  interface User {
    access_token: string;
    refresh_token: string;
    user: IUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    refresh_token: string;
    user: IUser;
  }
}
