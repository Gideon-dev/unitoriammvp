"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function useHeartbeat(interval = 60_000) {
  const { data: session } = useSession();
  // console.log('supa_id',session?.user?.supabaseId); // <-- Should show UUID

  useEffect(() => {
    if (!session?.userId) return;

    const sendHeartbeat = async () => {
      try {
        await fetch("/api/track-event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            user_id: session?.user?.supabaseId,
            type: "heartbeat",
          }),
        });
      } catch (err) {
        console.error("Failed to send heartbeat:", err);
      }
    };

    const intervalId = setInterval(sendHeartbeat, interval);
    sendHeartbeat(); // send immediately on load

    return () => clearInterval(intervalId);
  }, [session?.userId, interval]);
}
