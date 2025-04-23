"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "loading") return; // Don't redirect yet

    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);
  
  return (
    <main>
      <p>loading......</p>
    </main>
  );
}
