"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
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
      router.push("/dashboard");
    }
  }, [status, router]);
  
  return (
    <main className="fixed inset-0 w-full h-full bg-black/40 backdrop-blur-sm flex items-center justify-center bg-black z-50 border">
      <div className="">
        <Image 
        src="/unitoria-fav-icon.svg"
        width={0} 
        height={0} 
        className="w-[50px] h-[50px] animate-pulse" 
        alt="unitoria logo"
        />
      </div>
    </main>
  );
}
