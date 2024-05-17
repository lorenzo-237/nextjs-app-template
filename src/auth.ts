import {
  credentialsOverrideJwt,
  credentialsSignInCallback,
} from "./lib/authentication/credentials-provider";
import { nextAuthProviders } from "./lib/authentication/nextauth-providers";
import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

export const { handlers, auth } = NextAuth((req) => ({
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  adapter: PrismaAdapter(prisma),
  providers: nextAuthProviders(),
  // session: {
  //   strategy: "database",
  // },
  events: {
    signIn: credentialsSignInCallback(req),
  },
  jwt: credentialsOverrideJwt,
}));
