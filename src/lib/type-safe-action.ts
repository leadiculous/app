import { createSafeActionClient } from "next-safe-action";
import { getAuth } from "@/server/auth";

const DEFAULT_SERVER_ERROR_MESSAGE =
  "An error occurred while processing your request. Please try again later and contact support if the problem persists.";

/**
 * Represents an error that should be displayed to the user.
 */
export class PublicError extends Error {}

export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    console.error("Action error:", error);

    let message = DEFAULT_SERVER_ERROR_MESSAGE;

    if (error instanceof PublicError && error.message !== "") {
      message += ` Error details: ${error.message}.`;
    }

    return message;
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const { error, user } = await getAuth();

  if (error || !user) {
    throw new Error("You must be signed in to perform this action");
  }

  return next({ ctx: { userId: user.id } });
});
