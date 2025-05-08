import { JWT } from "next-auth/jwt";
import { JWT, User as NextAuthUser , NextAuth} from "next-auth";

// Augmenting the JWT type
declare module "next-auth/jwt" {
  interface JWT {
    token_type?: string;
    exp?: number;
    iat?: number;
    jti?: number;
    sub?: string;
    full_name?: string;
    email?: string;
    username?: string;
    accessToken?: string;
    refreshToken?: string;
    user_id?: string;
  }
}

declare module "next-auth" {
    interface User {
      accessToken: string;
      refreshToken: string;
    }
}
  

// Augment the Session type
declare module "next-auth" {
  interface Session {
    token_type?: string;
    exp?: number;
    iat?: number;
    jti?: number;
    userId?: string;
    full_name?: string;
    email?: string | null | undefined;
    username?: string;
    accessToken?: string;
    refreshToken?: string;
    supabase_id?: string;
    user: {
      email?: string;
      name?: string;
      image?: string;
      supabase_id?: string; 
      [key: string]: any;    // optional catch-all for flexibility
    };
  }

  interface User {
    supabaseId?: string; // To be passed in the `signIn` callback
  }
}
