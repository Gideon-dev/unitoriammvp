import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/authOptions";


export async function auth() {
  return await getServerSession(authOptions);
}
