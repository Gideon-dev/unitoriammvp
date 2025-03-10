"use client";
import { useEffect } from "react";

export default function ScreenProtection() {
  useEffect(() => {
    const blockScreenRecording = () => {
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          alert("Screen recording is not allowed!");
          window.location.reload();
        }
      });
    };

    blockScreenRecording();
    return () => {
      document.removeEventListener("visibilitychange", blockScreenRecording);
    };
  }, []);

  return null;
}
