import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
}

interface IGuest {
  id: number;
  name: string;
  tableNumber: number;
  role: string;
}

declare module "next-auth" {
  interface Session {
    access_token: string;
    refresh_token: string;
    user: IUser;
    guest: IGuest;
    access_expire: number;
    error: string;
    errorGuest: string;
    access_expire_guest: number;
  }

  interface User {
    access_token: string;
    refresh_token: string;
    user: IUser;
    guest: IGuest;
    access_expire: number;
    error: string;
    errorGuest: string;
    access_expire_guest: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    refresh_token: string;
    user: IUser;
    guest: IGuest;
    access_expire: number;
    error: string;
    errorGuest: string;
    isGuest: boolean;
    access_token_guest: string;
    refresh_token_guest: string;
    access_expire_guest: number;
  }
}
