import { env } from "../env";
import { prisma } from "../prisma";
import { signInSchema } from "./signInSchema";
import crypto from "crypto";
import { nanoid } from "nanoid";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export const validatePassword = (password: string) => {
  return PASSWORD_REGEX.test(password);
};

export const hashStringWithSalt = (string: string, salt: string) => {
  const hash = crypto.createHash("sha256");

  const saltedString = salt + string;

  hash.update(saltedString);

  const hashedString = hash.digest("hex");

  return hashedString;
};

export const getCredentialsProvider = () => {
  return Credentials({
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials) => {
      const { email, password } = await signInSchema.parseAsync(credentials);

      // logic to salt and hash password
      const pwHash = hashStringWithSalt(password, env.AUTH_SECRET);

      // logic to verify if user exists
      const user = await prisma.user.findFirst({
        where: {
          email: email,
          passwords: {
            some: {
              passwordHash: pwHash,
            },
          },
        },
      });

      if (!user) {
        // No user found, so this is their first attempt to login
        // meaning this is also the place you could do registration
        throw new Error("User not found.");
      }

      // return user object with the their profile data
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      };
    },
  });
};

const tokenName =
  env.NODE_ENV === "development"
    ? "authjs.session-token"
    : "__Secure-authjs.session-token";

type SignInCallback = NonNullable<NextAuthConfig["events"]>["signIn"];

type JwtOverride = NonNullable<NextAuthConfig["jwt"]>;

export const credentialsSignInCallback =
  (request: NextRequest | undefined): SignInCallback =>
  async ({ user }) => {
    if (!request) {
      return;
    }

    if (request.method !== "POST") {
      return;
    }

    const currentUrl = request.url;

    if (!currentUrl.includes("credentials")) {
      return;
    }

    if (!currentUrl.includes("callback")) {
      return;
    }

    const uuid = nanoid();
    // + 7 days
    const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await prisma.session.create({
      data: {
        sessionToken: uuid,
        userId: user.id ?? "",
        // expires in 2 weeks
        expires: expireAt,
      },
    });

    const cookieList = cookies();

    cookieList.set(tokenName, uuid, {
      expires: expireAt,
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      secure: env.NODE_ENV === "production",
    });

    return;
  };

// This override cancel JWT strategy for password. (it's the default one)
export const credentialsOverrideJwt: JwtOverride = {
  encode() {
    return "";
  },
  async decode() {
    return null;
  },
};
