import { queryOptions } from "@tanstack/react-query";
import { client } from "./client";

export const profileQueryOptions = queryOptions({
  queryKey: ["profile"],
  queryFn: async () => {
    const res = await client.api.posts.$get();
    return res.json();
  },
});
