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
    email?: string;
    username?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}
