import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signIn"); // server-side redirect
  }

  return <>{children}</>;
}
