import { auth } from "../utils/auth";

export async function getEnrolledCourses() {
  const session = await auth(); // Get authenticated user

  if (!session?.accessToken) {
    console.error("No valid access token found");
    return [];
  }

  try {
    const response = await fetch(`https://tutormeapi-6w2f.onrender.com/api/v2/student/course-list/${session.userId}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to fetch enrolled courses");

    const data = await response.json();
    return data?.courses || []; // Assuming the API response has `courses` array
  } catch (error: any) {
    console.error("Error fetching enrolled courses:", error.message);
    return [];
  }
}
