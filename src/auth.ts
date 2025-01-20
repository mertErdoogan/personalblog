/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";
import { query } from './lib/db';
import { Account, Session, User } from "next-auth";
import { AdapterUser } from 'next-auth/adapters';
import ProviderProfile from './next-auth';

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: any; account: any }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = account.providerAccountId;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: any;
      token: any;
    }) {
      const email = session?.user?.email;
      const queryString = "SELECT * FROM users WHERE email = $1";
      const values = [email];
      const res = await query(queryString, values);
      if (res.length > 0) {
        session = {
          ...session,
          user: {
            ...session.user,
            id: token.id,
          },
        };
      }
      return session;
    },
    async signIn({
      user,
      profile,
    }: {
      user: AdapterUser | User;
      profile?: ProviderProfile | null;
    }): Promise<boolean> {
      if (!profile || (!profile.id && !user?.id)) {
        console.error("Profile Id not found");
        return false;
      }
      try {
        const providerId = profile?.id?.toString() || user?.id.toString();
        const name = profile.name;
        const email = profile.email;
        const avatarUrl = profile?.avatar_url;
        const result: any = await query(
          "SELECT * FROM users WHERE provider_id = $1",
          [providerId]
        );

        if (result.length === 0) {
          const res = await query(
            "INSERT INTO users (provider_id, name, email, avatar_url) VALUES ($1, $2, $3, $4)",
            [providerId, name, email, avatarUrl]
          );
        }

        if (result) {
        }

        return true; // Giriş başarılı
      } catch (error) {
        console.error("Database error during sign-in:", error);
        return false; // Giriş başarısız
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};