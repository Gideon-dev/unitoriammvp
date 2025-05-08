import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";
import { NextResponse } from "next/server";
import { MarkCompleteResponse } from "@/app/utils/interface";


export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const progressData:MarkCompleteResponse = await req.json();
        // console.log("data from route response", progressData)

        if (!progressData) {
            return NextResponse.json(
                { error: "Missing course_id or variant_item_id" },
                { status: 400 }
            );
        }
        const response = await fetch("https://tutormeapi-6w2f.onrender.com/api/v2/lesson/completed/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(progressData),
          });
          const data:MarkCompleteResponse = await response.json()
        // console.log("data from route response", data)

        return NextResponse.json({
            message: data.message ,
            total_completed: data.total_completed,
            completed_lessons: data.completed_lessons
        });
    } catch (err) {
    console.error("Mark-completed error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}