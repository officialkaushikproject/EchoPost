// /app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connect } from "@/utils/db";
import User from "@/model/User";
import { oauthUserSchema } from "@/lib/zodSchema";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials;
          if (!email || !password) return null;

          await connect();

          const user = await User.findOne({ email });
          if (!user || user.provider !== "credentials") return null;

          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) return null;

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            handle: user.handle,
            provider: user.provider,
          };
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      await connect();
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser && account.provider !== "credentials") {
        const newUserData = {
          email: user.email,
          name: user.name,
          provider: account.provider,
        };

        const validation = oauthUserSchema.safeParse(newUserData);
        if (!validation.success) return false;

        const newUser = await User.create(newUserData);
        user.id = newUser._id.toString();
        user.provider = account.provider;
      } else if (existingUser) {
        user.id = existingUser._id.toString();
        user.provider = existingUser.provider;
        user.handle = existingUser.handle;
      }

      return true;
    },

    async jwt({ token, user, trigger, session }) {
      // If this is a new login
      if (user) {
        await connect();
        const dbUser = await User.findOne({ email: user.email });

        if (dbUser) {
          token.id = dbUser._id.toString();
          token.email = dbUser.email;
          token.name = dbUser.name;
          token.provider = dbUser.provider;
          token.hasHandle = !!dbUser.handle; // Check if handle exists
        } else {
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
          token.provider = user.provider;
          token.hasHandle = !!user.handle;
        }
      }

      // If session is being updated (when you call update() function)
      if (trigger === "update") {
        await connect();
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) {
          token.hasHandle = !!dbUser.handle; // Refresh handle status from database
          token.handle = dbUser.handle;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.provider = token.provider;
      session.user.hasHandle = token.hasHandle;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
