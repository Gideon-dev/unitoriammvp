import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // You could add role-based logic here
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Only allow access if user is logged in
        return !!token;
      },
    },
    pages: {
      signIn: "/auth/signIn", // custom redirect
    },
  }
);

// Apply middleware to protected routes
export const config = {
  matcher: ["/dashboard"],
};