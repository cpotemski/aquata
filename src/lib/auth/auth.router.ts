import { db } from "@/lib/db";
import { baseProcedure, router } from "@/trpc";

export const authRouter = router({
  isLoggedIn: baseProcedure.query(async ({ ctx }) => {
    return db.user.findUnique({
      where: { id: ctx.userId ?? "" },
      include: { station: true },
    });
  }),
});
