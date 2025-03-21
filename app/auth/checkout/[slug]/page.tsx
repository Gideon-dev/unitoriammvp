import CheckOutPageClient from "@/app/components/CheckOutPageClient";
import { getCourse } from "@/app/lib/getCourse";
import { auth } from "@/app/utils/auth";
import { MainCourse } from "@/app/utils/interface";
import { redirect } from "next/navigation";

export default async function CheckOutPage({ params }: { params: Promise<{ slug: string }> }) {
  const session = await auth();
  const resolvedParams = await params; // ✅ Await the params if it's a Promise

  const course: MainCourse | null = await getCourse(resolvedParams.slug);

  if (!course) {
    return <p>Course not found</p>;
  }
  if (!session?.accessToken) {
    redirect("/auth/login?redirect=/checkout");
  }

  return <CheckOutPageClient course={course} />;
}
