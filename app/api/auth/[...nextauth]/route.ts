import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { query } from "@/database/db";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        // skip validation
        const response = await query("SELECT * FROM users WHERE email=$1", [
          credentials?.email,
        ]);
        const user = response.rows[0];
        const passwrodCorrect = await compare(
          credentials?.password || "",
          user.password
        );

        if (passwrodCorrect) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
