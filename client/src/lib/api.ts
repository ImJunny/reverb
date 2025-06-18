import { queryOptions } from "@tanstack/react-query";
import { client } from "./client";

export const profileQueryOptions = queryOptions({
  queryKey: ["profile"],
  queryFn: async () => {
    const res = await client.api.tracks.feed.$get();
    return res.json();
  },
});
