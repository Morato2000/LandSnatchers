import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/config/database";
import User from "@/models/User"; // Import the User model
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //Invoked on successful sign in
    async signIn({ profile }) {
      await connectDB(); // Connect to the database
      // Check if the user already exists in the database
      const userExists = await User.findOne({ email: profile.email });
      if (!userExists) {
        const username = profile.name.slice(0, 20);
        // If the user does not exist, create a new user
        await User.create({
          username,
          email: profile.email,
          image: profile.picture,
        });
      }
      return true; // Return true to indicate successful sign-in
    },
    //Session callback function that modifies the session object
    async session({ session, token }) {
      const user = await User.findOne({ email: session.user.email });
      session.user.id = user._id.toString(); // Add user ID to the session object
      return session;
    },
  },
};
