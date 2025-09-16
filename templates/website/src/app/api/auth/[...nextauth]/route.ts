import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

// Check if Google OAuth is properly configured
const isGoogleConfigured = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET

  return (
    clientId &&
    clientSecret &&
    clientId !== 'your-google-client-id' &&
    clientSecret !== 'your-google-client-secret' &&
    clientId !== 'test-google-client-id' &&
    clientSecret !== 'test-google-client-secret'
  )
}

export const authOptions: NextAuthOptions = {
  providers: [
    ...(isGoogleConfigured()
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
              params: {
                prompt: 'consent',
                access_type: 'offline',
                response_type: 'code',
                scope: 'openid email profile',
              },
            },
          }),
        ]
      : []),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string
      }
      if (token.id && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after successful OAuth
      if (url.includes('/api/auth/callback/google')) {
        return baseUrl + '/dashboard'
      }
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      if (url.startsWith(baseUrl)) return url
      return baseUrl + '/dashboard'
    },
    async signIn({ user, account, profile, email, credentials }) {
      // Allow all sign-ins for now (add your validation logic here)
      return true
    },
  },
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
