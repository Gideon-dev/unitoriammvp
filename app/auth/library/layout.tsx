// app/(protected)/layout.tsx – Protects only logged-in pages
import { auth } from "@/app/utils/auth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.accessToken) {
    redirect("/auth/signIn");
  }

  return <>{children}</>;
}
