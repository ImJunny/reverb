import { Hono } from "hono";
import {
  authorize,
  getSession,
  handleCallback,
  signOut,
} from "../procedures/public/auth";

// Public API routes
export const authRoute = new Hono()
  .get("/authorize", authorize)
  .get("/callback", handleCallback)
  .post("/signout", signOut)
  .get("/session", getSession);

// Public API
export const publicApi = new Hono().route("/auth", authRoute);
