import { auth } from "../utils/auth";
import { MainCourse } from "../utils/interface";

export async function getCourse(slug: string | null):Promise<MainCourse | null> {
    console.log("Fetching course with slug:", slug); // Debugging
    
    const session = await auth();

       try {
        const headers: Record<string, string> = {}; // Default headers
        if (session?.accessToken) {
            headers.Authorization = `Bearer ${session.accessToken}`;
        }

        const response = await fetch(`https://tutormeapi-6w2f.onrender.com/api/v2/course/course-detail/${slug}/`, {
            method: "GET",
            headers, // Apply headers dynamically
            cache: "no-store", // Ensure fresh data
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch course. Status: ${response.status}`);
        }

        return await response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error fetching course:", error.message);
        } else {
            console.error("An unexpected error occurred", error);
        }
        return null; // Handle errors gracefully
    }
}
