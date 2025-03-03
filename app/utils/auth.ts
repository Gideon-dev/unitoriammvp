import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function auth() {
  return await getServerSession(authOptions);
}
