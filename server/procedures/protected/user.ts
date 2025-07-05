import { getSpotifyCurrentUserProfile } from "@server/lib/spotify-helpers";
import type { ProtectedContext } from "@server/utils/auth-middleware";

export async function getUserProfile(c: ProtectedContext) {
  try {
    const accessToken = c.get("access_token");
    const userProfileData = await getSpotifyCurrentUserProfile(accessToken);
    const formattedData = {
      id: userProfileData.id,
      display_name: userProfileData.display_name,
      email: userProfileData.email,
      images: userProfileData.images?.map((img) => ({
        url: img.url,
      })),
    };
    return c.json(formattedData, 200);
  } catch (error: any) {
    return c.json(
      { message: "Failed to fetch user profile", error: error.message },
      500
    );
  }
}
