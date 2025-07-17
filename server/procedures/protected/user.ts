import {
  createRecentlyViewedDB,
  getRecentlyViewedDB,
  getRecentlyViewedPostsDB,
} from "@server/db/actions/user-actions";
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

export async function createRecentlyViewed(c: ProtectedContext) {
  try {
    const userId = c.get("user_id");
    const body = await c.req.json();
    const { type, content_id } = body;
    await createRecentlyViewedDB(userId, type, content_id);

    return c.json(
      { message: "Recently viewed item created successfully" },
      201
    );
  } catch (error: any) {
    console.log(error);
    return c.json(
      {
        message: "Failed to create recently viewed item",
        error: error.message,
      },
      500
    );
  }
}

export async function getRecentlyViewed(c: ProtectedContext) {
  try {
    const userId = c.get("user_id");
    const limitParam = c.req.query("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : 10;
    const type = c.req.query("type") as "post" | "playlist" | "user" | "artist";
    const recentlyViewed = await getRecentlyViewedDB(userId, type, limit);
    return c.json(recentlyViewed, 200);
  } catch (error: any) {
    return c.json(
      {
        message: "Failed to fetch recently viewed items",
        error: error.message,
      },
      500
    );
  }
}

export async function getRecentlyViewedPosts(c: ProtectedContext) {
  try {
    const userId = c.get("user_id");
    const limitParam = c.req.query("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : 10;
    const recentlyViewedPosts = await getRecentlyViewedPostsDB(userId, limit);
    return c.json(recentlyViewedPosts, 200);
  } catch (error: any) {
    return c.json(
      {
        message: "Failed to fetch recently viewed posts",
        error: error.message,
      },
      500
    );
  }
}
