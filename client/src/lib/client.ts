import { type ApiRoutes } from "@server/index";
import { hc } from "hono/client";

export const client = hc<ApiRoutes>("http://localhost:3000/");
