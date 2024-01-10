import prisma from "@/app/db";
import { signJwtAccessToken } from "@/utilities/Jwt";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// User interface
interface UserProps {
  id: string;
  name: string;
  email: string;
  isVerified: boolean | null;
  profilePic: string | null;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      // @ts-ignore
      async authorize(credentials, req) {
        // destructuring data
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          // Finding user
          const userExists = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
          });

          // If user is not found
          if (!userExists) {
            return null;
          }

          // Comparing password
          const isPasswordCorrect = await bcrypt.compareSync(
            password,
            userExists.password
          );

          // If password does not matches
          if (!isPasswordCorrect) {
            return null;
          }

          // Setting user data
          const newUser: UserProps = {
            id: userExists.id,
            name: userExists.name,
            email: userExists.email,
            isVerified: userExists.isVerified,
            profilePic: userExists.profilePic,
          };

          // Getting access token
          const accessToken = signJwtAccessToken(newUser);
          // Setting user object to return
          const user = {
            ...newUser,
            accessToken,
          };

          // Returing
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
};
