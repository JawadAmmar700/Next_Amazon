import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId:
        '631721808685-bbjpo4lkp079m7t3ubqj5jh6jbt1i46o.apps.googleusercontent.com',
      clientSecret: 'xYQ9yPbzfteq3yrh84L6WS5P',
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
})
