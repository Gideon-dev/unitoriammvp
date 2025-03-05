import CheckOutPageClient from "@/app/components/CheckOutPageClient";
import { getCourse } from "@/app/lib/getCourse";
import { MainCourse } from "@/app/utils/interface";

export default async function CheckOutPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params; // ✅ Await the params if it's a Promise

  const course: MainCourse | null = await getCourse(resolvedParams.slug);

  if (!course) {
    return <p>Course not found</p>;
  }

  return <CheckOutPageClient course={course} />;
}
