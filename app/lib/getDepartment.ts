import { auth } from "../utils/auth";

export async function getAllDept() {
    const session = await auth();
    if (!session?.accessToken) {
        console.error("No valid access token found");
        return [];
    }

    try {
        const response = await fetch(`https://tutormeapi-6w2f.onrender.com/api/v2/department-list/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          cache: "no-store",
        });
    
        if (!response.ok) throw new Error("Failed to fetch department");
        const data = await response.json();
        return data || []; 
      } catch (error: unknown) {
        if(error instanceof Error){
          console.error("Error fetching department:", error.message);
        }
        return [];
    }
    
}