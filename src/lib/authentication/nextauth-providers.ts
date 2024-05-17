import { env } from "../env";
import { getCredentialsProvider } from "./credentials-provider";
import { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";

type Providers = NonNullable<NextAuthConfig["providers"]>;

export const nextAuthProviders = () => {
  const providers: Providers = [getCredentialsProvider()];

  if (env.AUTH_GITHUB_ID && env.AUTH_GITHUB_SECRET) {
    providers.push(
      GitHub({
        allowDangerousEmailAccountLinking: true,
      }),
    );
  }

  return providers;
};
