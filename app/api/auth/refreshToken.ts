import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session || !session.refreshToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Exchange refresh token for a new access token
    const response = await axios.post("https://tutormeapi-6w2f.onrender.com/api/v2/user/token/refresh/", {
      grant_type: "refresh_token",
      refresh_token: session.refreshToken,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    });

    // Update the session
    const newAccessToken = response.data.access_token;
    const newRefreshToken = response.data.refresh_token || session.refreshToken

    res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ error: "Could not refresh token" });
  }
}
