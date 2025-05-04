import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import { JwtPayload } from "@/app/utils/interface";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // console.log("Credentials received:", credentials);
        try {
          const res = await fetch("https://tutormeapi-6w2f.onrender.com/api/v2/user/token/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          const responseJson = await res.json();
          

          const accessToken = responseJson.access || null;
          const refreshToken = responseJson.refresh || null;

          if (!accessToken || !refreshToken) {
            throw new Error("Missing access or refresh token in response");
          }

          const decoded = jwt.decode(accessToken) as JwtPayload;
          // console.log("Decoded jwt:" ,decoded);

          return {
            id: String(decoded?.user_id) || "",
            email: decoded?.email || credentials?.email || "",
            full_name: decoded?.full_name || "",
            username: decoded?.username || "",
            accessToken,
            refreshToken,
          };
        } catch (error) {
          console.error("Error in authorize:", error);
          throw new Error("An unexpected error occurred.");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  pages: { signIn: "/auth/signIn" },
  callbacks: {
    async jwt({ account, token, user, trigger }) {
     if(user && account){
      if (account?.provider === "google" && trigger !== "update") {
        try {
          // Call your backend to register/login the user
          const res = await fetch("https://tutormeapi-6w2f.onrender.com/api/v2/auth/google/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({id_token: account?.id_token }),
          });
  
          const responseJson = await res.json();
            
          token.accessToken = responseJson.access;
          token.refreshToken = responseJson.refresh;
  
          const decoded = jwt.decode(responseJson.access) as JwtPayload;
          token.sub = String(decoded?.user_id);
          token.email = decoded?.email;
          token.full_name = decoded?.full_name;
          token.username = decoded?.username;
  
        } catch (error) {
          console.error("Error during Google token fetch:", error);
        }
      }
  
      // If normal credentials login
      if (user && account?.provider !== "google") {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
  
        const decoded = jwt.decode(user.accessToken) as JwtPayload;
        token.sub = String(decoded?.user_id);
        token.email = decoded?.email;
        token.full_name = account?.provider === 'google'
        ? decoded?.name
        : decoded?.full_name;
        token.username = decoded?.username;
       
      }
     }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.userId = token.sub;
      session.full_name = token.full_name;
      session.user!.email = token.email;
    
      return session;
      
    },
  },
};
