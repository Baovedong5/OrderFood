import envConfig from "@/config";
import { LoginResType } from "@/schemaValidations/auth.schema";
import { http } from "@/utils/http";
import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  secret: envConfig.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "Tên đăng nhập",
          type: "text",
        },
        password: { label: "Mật khẩu", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await http<IBackendRes<LoginResType>>({
          url: `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/api/v1/auth/login`,
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
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      if (trigger === "signIn" && account?.provider === "credentials") {
        token.access_token = user.access_token;
        token.refresh_token = user.refresh_token;
        token.user = user.user;
      }
      return token;
    },
    session({ session, token, user }) {
      if (token) {
        session.access_token = token.access_token;
        session.refresh_token = token.refresh_token;
        session.user = token.user;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
