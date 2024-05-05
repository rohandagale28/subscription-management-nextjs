import NextAuth from "next-auth/next";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";


const handler = NextAuth({
    providers: [
        Github({
            clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENTID,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENTSECRET
        }),
        Google({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENTID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENTSECRET
        })
    ]
})

export { handler as GET, handler as POST }