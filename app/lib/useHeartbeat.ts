"use client"
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export function useHeartbeat(interval = 30_000) {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.userId) return;

    const sendHeartbeat = async () => {
      await fetch('/api/track-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.userId}),
      });
    };

    const intervalId = setInterval(sendHeartbeat, interval);

    return () => clearInterval(intervalId);
  }, [session?.userId, interval]);
}