import { auth } from "../utils/auth";
import { MainCourse } from "../utils/interface";

export async function getCourse(slug: string | null):Promise<MainCourse | null> {
    console.log("Fetching course with slug:", slug); // Debugging
    
    const session = await auth() // Ensure authentication
    // console.log("getCourse Session Data:", session);
    if (!session?.accessToken) {
        console.error("No valid access token found");
        throw new Error("Unauthorized");
    }

    try {
        const response = await fetch(`https://tutormeapi-6w2f.onrender.com/api/v2/course/course-detail/${slug}/`, {
            method:"GET",
            headers: { Authorization: `Bearer ${session.accessToken}` },
            cache: "no-store", // Ensure fresh data on every request
        });

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
