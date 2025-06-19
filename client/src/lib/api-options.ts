import { queryOptions } from "@tanstack/react-query";
import { client } from "./client";

export const userTopTracksQueryOptions = queryOptions({
  queryKey: ["profile"],
  queryFn: async () => {
    const res = await client.api.users.getUserTopTracks.$get();
    if (!res.ok) {
      throw new Error("Failed to fetch top tracks");
    }
    return res.json();
  },
});

export const currentUserProfileQueryOptions = queryOptions({
  queryKey: ["current-user-profile"],
  queryFn: async () => {
    const res = await client.api.users.getUserProfile.$get();
    if (!res.ok) {
      throw new Error("Failed to fetch user profile");
    }
    return res.json();
  },
});
