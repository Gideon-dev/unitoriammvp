import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { JwtPayload } from "@/app/utils/interface";



export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  debug: true,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credentials received:", credentials);
        try {
          const res = await fetch("https://tutormeapi-6w2f.onrender.com/api/v2/user/token/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });
      
          const responseText = await res.text(); // Read response as text
      
          const responseJson = JSON.parse(responseText);
          console.log("Parsed API Response:", responseJson);
      
          // Adjust token names based on the API response
          const accessToken: string = responseJson.access || null;
          const refreshToken:string = responseJson.refresh || null;
      
          if (!accessToken || !refreshToken) {
            throw new Error("Missing access or refresh token in response");
          }
      
          // Decode access token to extract user details
          const decoded = jwt.decode(accessToken) as JwtPayload;
      
          console.log("Decoded Token:", decoded);
      
          // Return user object expected by NextAuth
          return {
            id: String(decoded?.user_id) || "", // Convert ID to string
            email: decoded?.email || credentials?.email || "",
            full_name: decoded?.full_name || "",
            username: decoded?.username || "",
            accessToken,
            refreshToken,
          };
        } catch (error: any) {
          console.error("Error in authorize:", error);
          throw new Error(error.message || "An error occurred while authenticating.");
        }
      }
      
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
       

        if (user.accessToken) {
          const decoded = jwt.decode(user.accessToken) as JwtPayload;
          if (decoded?.user_id) {
            token.sub = String(decoded.user_id); // Ensure it's a string
          }    
          token.email = decoded?.email;
          token.full_name = decoded?.full_name;
          token.username = decoded?.username;
          token.sub = String(decoded?.user_id);

        }
      }
      
      console.log("token",token);
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.userId = token.sub; 
      session.full_name = token.full_name;
      session.user!.email = token.email; 
      console.log("Session object:", session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
