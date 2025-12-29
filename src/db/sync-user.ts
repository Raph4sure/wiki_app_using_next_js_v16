import db from "@/db/index";
import { usersSync } from "./schema";

type StackUserType = {
  id: string;
  displayName: string | null;
  primaryEmail: string | null;
};

export async function ensureUserExist(stackUser: StackUserType): Promise<void> {
  await db
    .insert(usersSync)
    .values({
      id: stackUser.id,
      name: stackUser.displayName,
      email: stackUser.primaryEmail,
    })
    .onConflictDoUpdate({
      target: usersSync.id,
      set: {
        name: stackUser.displayName,
        email: stackUser.primaryEmail,
      },
    });
}
