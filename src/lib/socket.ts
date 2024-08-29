import { io } from "socket.io-client";

const token =
  typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

const socket = io(process.env.NEXT_PUBLIC_API_ENDPOINT as string, {
  auth: {
    Authorization: `Bearer ${token}`,
  },
});

export default socket;
