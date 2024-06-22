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
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        const userDB = await User.findOne({ email: credentials.email });

        if (!userDB) {
          throw new Error("User not found");
        }
        const isMatch = await bcryptjs.compare(
          credentials.password,
          userDB.password
        );
        if (userDB || isMatch) {
          const { password, createdAt, _id, username, email } =
            userDB.toObject();
          return {
            id: _id.toString(),
            name: username,
            email: email,
            picture: "string",
          };
        }
        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      console.warn(token, "THIS IS TOKEN");
      console.log(user, "THIS IS USER");
      if (user) {
        token.id = user.id;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.image = token.picture;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});

export { handler as GET, handler as POST };
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import bcryptjs from "bcryptjs";
// import User from "@/model/user.model";
// import { connectDB } from "@/dbConfig/dbConfig";
// import { NextApiHandler } from "next";

// connectDB();

// const handler: NextApiHandler = NextAuth({
//   providers: [
//     GithubProvider({
//       clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENTID as string,
//       clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENTSECRET as string,
//     }),
//     GoogleProvider({
//       clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENTID as string,
//       clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENTSECRET as string,
//     }),
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: async (credentials: { email: string, password: string }) => {
//         await connectDB();

//         try {
//           const user = await User.findOne({ email: credentials.email });
//           if (!user) {
//             throw new Error("Invalid Password");
//           }
//           const isPasswordValid = await bcryptjs.compare(
//             credentials.password,
//             user.password
//           );
//           if (!isPasswordValid) {
//             throw new Error("Invalid Password");
//           }
//           return user;
//         } catch (error) {
//           throw new Error("User does not exist");
//         }
//       },
//     }),
//   ],

//   secret: process.env.NEXTAUTH_SECRET,

//   callbacks: {
//     async session({ session, token, user }) {
//       if (token.provider === 'credentials') {
//         console.log(session, "this is session");
//         console.log(token, "this is token");
//         console.log(user, "this is user");

//         if (session.user) {
//           const dbUser = await User.findOne({ email: session.user.email });

//           if (dbUser) {
//             session.user.id = dbUser._id;
//             session.user.name = dbUser.name || token.name;
//             session.user.email = dbUser.email || token.email;
//             return { ...session };
//           }

//           const newUser = new User({
//             email: session.user.email,
//             name: session.user.name,
//             image: session.user.image,
//             password: session.user.name,
//             isVerified: true,
//           });

//           const res = await newUser.save();
//           session.user.id = res._id;
//           session.user.name = token.name;
//           return { ...session };
//         }
//       }
//       return session;
//     },

//     async jwt({ token, user, account, profile, isNewUser }) {
//       if (account?.provider) {
//         token.provider = account.provider;
//       }
//       return token;
//     },
//   },

//   pages: {
//     signIn: "/auth/signin",
//     error: "/auth/error", // Error code passed in query string as ?error=
//   },
// });

// export { handler as GET, handler as POST };
