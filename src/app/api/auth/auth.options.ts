import { LoginResType } from "@/schemaValidations/auth.schema";
import { http } from "@/utils/http";
import { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import dayjs from "dayjs";
import { GuestLoginResType } from "@/schemaValidations/guest.schema";

async function refreshAccessToken(token: JWT) {
  const res = await http<IBackendRes<JWT>>({
    url: "/api/v1/auth/refresh",
    method: "POST",
    body: {
      refresh_token: token?.refresh_token,
    },
  });

  if (res && res.data) {
    return {
      ...token,
      access_token: res.data?.access_token ?? "",
      refresh_token: res.data?.refresh_token ?? "",
      access_expire: dayjs(new Date())
        .add(
          +(process.env.TOKEN_EXPIRE_NUMBER as string),
          process.env.TOKEN_EXPIRE_UNIT as any
        )
        .unix(),
      error: "",
    };
  } else {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

async function refreshAccessTokenGuest(token: JWT) {
  const res = await http<IBackendRes<JWT>>({
    url: "/api/v1/guests/auth/refresh-token",
    method: "POST",
    body: {
      refresh_token_guest: token?.refresh_token_guest,
    },
  });

  if (res && res.data) {
    return {
      ...token,
      access_token_guest: res.data?.access_token_guest ?? "",
      refresh_token_guest: res.data?.refresh_token_guest ?? "",
      access_expire_guest: dayjs(new Date())
        .add(
          +(process.env.TOKEN_EXPIRE_NUMBER as string),
          process.env.TOKEN_EXPIRE_UNIT as any
        )
        .unix(),
      error: "",
    };
  } else {
    return {
      ...token,
      errorGuest: "RefreshAccessGuestTokenError",
    };
  }
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials-admin",
      credentials: {
        username: {
          label: "Tên đăng nhập",
          type: "text",
        },
        password: { label: "Mật khẩu", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await http<IBackendRes<LoginResType>>({
          url: `/api/v1/auth/login`,
          method: "POST",
          body: {
            username: credentials?.username,
            password: credentials?.password,
          },
        });

        if (res && res.data) {
          return res.data as any;
        } else {
          throw new Error(res?.message as string);
        }
      },
    }),
    CredentialsProvider({
      name: "Guest Login",
      id: "credentials-guest",
      credentials: {
        name: { label: "Tên", type: "text" },
        token: { label: "Token", type: "text" },
        tableNumber: { label: "Table Number", type: "text" },
      },
      async authorize(credentials, req) {
        const { name, token, tableNumber } = credentials as {
          name: string;
          token: string;
          tableNumber: string;
        };

        const res = await http<IBackendRes<GuestLoginResType>>({
          url: "/api/v1/guests/auth/login",
          method: "POST",
          body: {
            name,
            token,
            tableNumber,
          },
        });

        if (res && res.data) {
          return res.data as any;
        } else {
          throw new Error(res?.message as string);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger, session }) {
      if (trigger === "signIn") {
        if (account?.provider === "credentials-admin") {
          token.access_token = user.access_token;
          token.refresh_token = user.refresh_token;
          token.user = user.user;
          token.access_expire = dayjs(new Date())
            .add(
              +(process.env.TOKEN_EXPIRE_NUMBER as string),
              process.env.TOKEN_EXPIRE_UNIT as any
            )
            .unix();
        } else if (account?.provider === "credentials-guest") {
          token.access_token_guest = user.access_token;
          token.refresh_token_guest = user.refresh_token;
          token.guest = user.guest;
          token.access_expire_guest = dayjs(new Date())
            .add(
              +(process.env.TOKEN_EXPIRE_NUMBER as string),
              process.env.TOKEN_EXPIRE_UNIT as any
            )
            .unix();
          token.isGuest = true;
        }
      }

      const accessExpire = token?.access_expire
        ? dayjs.unix(token.access_expire as number)
        : dayjs(0);

      const isTimeAfter = dayjs().isAfter(accessExpire);

      const accessGuestExpire = token?.access_expire_guest
        ? dayjs.unix(token.access_expire_guest as number)
        : dayjs(0);

      const isTimeAfterGuest = dayjs().isAfter(accessGuestExpire);

      if (isTimeAfterGuest) {
        return refreshAccessTokenGuest(token);
      }

      if (isTimeAfter) {
        return refreshAccessToken(token);
      }

      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        if (token.guest) {
          // Thiết lập session cho khách
          session.guest = token.guest;
          session.access_token = token.access_token_guest;
          session.refresh_token = token.refresh_token_guest;
          session.access_expire_guest = token.access_expire_guest;
          session.errorGuest = token.errorGuest;
        } else {
          // Thiết lập session cho quản lý
          session.access_token = token.access_token;
          session.refresh_token = token.refresh_token;
          session.user = token.user;
          session.access_expire = token.access_expire;
          session.error = token.error;
        }
      }
      return session;
    },
  },
};
