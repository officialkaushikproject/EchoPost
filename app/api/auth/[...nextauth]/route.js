import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connect } from "@/utils/db";
import User from "@/model/User";
import { oauthUserSchema } from "../../../../lib/zodSchema";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
const handler = NextAuth({
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
      // Here user email and pasword login and send send some data to jwt
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const { email, password } = credentials;
          if (!email || !password) {
            console.error("Email or Password Missing");
            return null;
          }

          // connect database
          await connect();

          const exists_user = await User.findOne({ email });
          if (!exists_user || exists_user.provider !== "credentials") {
            console.error("User not found or OAuth user");
            return null;
          }
          const isPasswordValid = await bcrypt.compare(
            password,
            exists_user.password
          );
          if (!isPasswordValid) {
            console.error("Wrong Credential");
            return null;
          }
          return {
            id: exists_user._id.toString(),
            name: exists_user.name,
            email: exists_user.email,
            handle: exists_user.handle,
            provider: exists_user.provider,
          };
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Here user can signup or login with github and google and if user is first time register then stored the info in db
      try {
        await connect();
        const exists_user = await User.findOne({ email: user.email });
        if (!exists_user && account.provider !== "credentials") {
          console.log("Creating new user from OAuth login...");

          const newUserData = {
            email: user.email,
            name: user.name,
            provider: account.provider,
          };

          // Validate OAuth user data
          const validationResult = oauthUserSchema.safeParse(newUserData);
          if (!validationResult.success) {
            console.error(
              "OAuth user validation failed:",
              validationResult.error
            );
            return false;
          }

          try {
            const newUser = await User.create(newUserData);
            console.log("OAuth user created successfully:", newUser);
            user.id = newUser._id.toString();
            user.provider = account.provider;
          } catch (createError) {
            console.error("Full error object:", createError);
            return false;
          }
        } else if (exists_user) {
          console.log("User already exists:", exists_user.email);
          user.id = exists_user._id.toString();
          user.provider = exists_user.provider;
          user.handle = exists_user.handle;
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        await connect();
        const dbUser = await User.findOne({ emai: user.email });
        // Step 3: If we found the user in database
        if (dbUser) {
          // Use the MongoDB _id as the token ID
          token.id = dbUser._id.toString(); // "507f1f77bcf86cd799439011"
          token.email = dbUser.email; // "user@example.com"
          token.name = dbUser.name; // "John Doe"
          token.provider = dbUser.provider; // "google" or "github"
          token.hasHandle = !!dbUser.handle; // true if handle exists, false if not
        } else {
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
          token.provider = user.provider;
          token.hasHandle = !!user.handle; //we set true or false value in the hasHandle varible
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
});

export { handler as GET, handler as POST };
