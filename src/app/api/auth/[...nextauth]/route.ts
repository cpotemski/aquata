import { handlers } from "@/lib/auth"; // Referring to the auth.ts we just created
export { auth as middleware } from "@/lib/auth";
export const { GET, POST } = handlers
