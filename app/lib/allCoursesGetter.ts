import { auth } from "../utils/auth";

export async function getAllCourses() {
    const session = await auth();
    if (!session?.accessToken) {
        console.error("No valid access token found");
        return [];
    }

    try {
        const response = await fetch(`https://tutormeapi-6w2f.onrender.com/api/v2/course/course-list/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          cache: "no-store",
        });
    
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        return data || []; 
      } catch (error: unknown) {
        if(error instanceof Error){
          console.error("Error fetching courses:", error.message);
        }
        return [];
    }
    
}