import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcryptjs from "bcryptjs";
import User from "@/model/user.model";
import { connectDB } from "@/dbConfig/dbConfig";

connectDB();

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENTID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENTSECRET,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENTID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENTSECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await connectDB();

        try {
          // Find the user by email
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("Invalid Password");
          }
          // Validate the password
          const isPasswordValid = await bcryptjs.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordValid) {
            throw new Error("Invalid Password");
          }

          return user;
        } catch (error) {
          throw new Error("user does not exist");
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session, token, user }) {
      console.log(session, "this is session");
      console.log(token, "this is token");
      console.log(user, "this is user");
      if (session.user) {
        session.user.name = token.name || user?.name;
        session.user.email = token.email || user?.email;

        if (session.user) {
          const user = await User.findOne({ email: session.user.email });

          if (user) {
            session.user.id = user?._id;
            return session;
          }

          const newUser = await User({
            email: session.user.email,
            name: session.user.name,
            image: session.user.picture,
            password: session.user.name,
            isVerified: true,
          });

          const res = await newUser.save();
          console.log(res, "this is coming from database");
        }
        session.user.id = res._id;
        token.id = res._id;
        return session;
      }
      return;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error", // Error code passed in query string as ?error=
  },
});

export { handler as GET, handler as POST };
