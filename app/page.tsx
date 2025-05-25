"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "loading") return; // wait until session status is resolved

    if (status === "unauthenticated") {
      router.push("/auth/signIn");
    } else if (status === "authenticated") {
      router.push("/auth/dashboard");
    }
  }, [status, router]);
  
  return (
    <main>
      <p>loading......</p>
    </main>
  );
}
