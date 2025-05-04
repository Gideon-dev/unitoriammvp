// "use client"
// import { useHeartbeat } from "@/app/lib/useHeartbeat"


export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  // useHeartbeat();
  return (
  <>
    {children}
  </>
  )
}
