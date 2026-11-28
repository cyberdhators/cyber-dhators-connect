/** A successful HTTP response alone does not prove that an update affected a row. */
export function requireSavedRecord<T extends { id: string }>(record: T | null): T {
  if (!record?.id) {
    throw new Error("Your changes were not saved. Check your editing permissions and try again.");
  }
  return record;
}