
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params:{
          scope:'read:user'
        }
      }
    }),
  ],
 
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        console.log('Não conseguiu realizar o login! ')  
        return false     
      }
    },
    async jwt({ token, account, profile }) {

      if (account) {
        token.id = profile.id
      }
      return token
    },
    async session({ session, token, user }) {
     
      session.user.id = token.id
      return session
    }
  }
}


export default NextAuth(authOptions)