"use server";

import { authActionClient } from "@/lib/type-safe-action";
import { createCampaign } from "@/server/services/campaign";
import { insertCampaignSchema } from "@/shared/schemas/campaign";

export const createCampaignAction = authActionClient
  .schema(insertCampaignSchema)
  .action(async ({ ctx: { userId }, parsedInput }) =>
    createCampaign(userId, parsedInput),
  );
