import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { auth } from "@/lib//auth";

export const createContext: (
  opts: CreateNextContextOptions
) => Promise<{ userId?: string }> = async (opts) => {
  const data = await auth();
  const userId = data?.user?.id;

  return {
    userId,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
