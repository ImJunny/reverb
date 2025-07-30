import { tags } from "shared/types";
import { db } from ".";
import { tagTypesTable } from "./schema";

await db
  .insert(tagTypesTable)
  .values(tags.map(({ value, label }) => ({ value, label })))
  .onConflictDoNothing({
    target: [tagTypesTable.value],
  });
