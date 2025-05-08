// app/api/track-event/route.ts
import { getServerSession } from "next-auth";
import { supabase } from "@/app/lib/supabaseClient";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/authOptions";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { user_id, type } = await req.json();

  if (!user_id || !type) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await supabase.from("user_activity_events").insert([
    {
      user_id,
      type,
      timestamp: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
