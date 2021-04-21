import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Discord({
            clientId: JSON.parse(process.env.DISCORD).clientID,
            clientSecret: JSON.parse(process.env.DISCORD).clientSecret
        })
    ],

})
