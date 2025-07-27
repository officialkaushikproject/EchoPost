import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connect } from "@/utils/db";
import User from "@/model/User";
import { oauthUserSchema } from "../../../../lib/zodSchema";

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
    // ...add more providers here
  ],
callbacks: {
  async signIn({ user, account }) {
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
          console.error("OAuth user validation failed:", validationResult.error);
          return false;
        }
               
        try {
          const newUser = await User.create(newUserData);
          console.log("OAuth user created successfully:", newUser);
        } catch (createError) {
          console.error("Full error object:", createError);
          return false;
        }
      } else if (exists_user) {
        console.log("User already exists:", exists_user.email);
      }

      return true;
    } catch (error) {
      console.error("Error in signIn callback:", error);
      return false;
    }
  },

  

}
});

export { handler as GET, handler as POST };
