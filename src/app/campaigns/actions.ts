"use server";

import { authActionClient } from "@/lib/type-safe-action";
import {
  createCampaign,
  deleteCampaigns,
  isExistingCampaign,
} from "@/server/services/campaign";
import {
  insertCampaignSchema,
  selectCampaignSchema,
} from "@/shared/schemas/campaign";
import { returnValidationErrors } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createCampaignAction = authActionClient
  .schema(insertCampaignSchema)
  .action(async ({ ctx: { userId }, parsedInput }) => {
    if (await isExistingCampaign(userId, parsedInput.name)) {
      returnValidationErrors(insertCampaignSchema, {
        name: {
          _errors: ["Another campaign with this name already exists"],
        },
      });
    }

    const campaign = await createCampaign(userId, parsedInput);

    revalidatePath("/campaigns");

    return campaign;
  });

export const deleteCampaignsAction = authActionClient
  .schema(z.array(selectCampaignSchema.shape.public_id))
  .action(async ({ ctx: { userId }, parsedInput: campaignPublicIds }) => {
    await deleteCampaigns(userId, campaignPublicIds);

    revalidatePath("/campaigns");
  });
