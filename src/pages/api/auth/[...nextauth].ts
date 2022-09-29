
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
    async jwt({ token, account }) {

      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
     
      session.accessToken = token.accessToken
      return session
    }
  }
}


export default NextAuth(authOptions)