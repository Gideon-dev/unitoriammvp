import { NextResponse } from "next/server";
import { getAllCourses } from "@/app/lib/allCoursesGetter";
import { getAllDept } from "@/app/lib/getDepartment";
import { Dept, MainCourse } from "@/app/utils/interface";

export async function GET() {
  try {
    const courses:MainCourse[] = await getAllCourses();
    const dept:Dept[] = await getAllDept();

    if (!courses || !dept) {
      return NextResponse.json({ error: "Failed to fetch courses and departments" }, { status: 500 });
    }

    return NextResponse.json({
      courseList: courses.map((c) => c.category),
      department: dept.map((c) => c.name),
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
