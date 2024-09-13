"use server";

import { authActionClient } from "@/lib/type-safe-action";
import { createCampaign, deleteCampaign, isExistingCampaign } from "@/server/services/campaign";
import { insertCampaignSchema, selectCampaignSchema } from "@/shared/schemas/campaign";
import { returnValidationErrors } from "next-safe-action";
import { revalidatePath } from "next/cache";

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

export const deleteCampaignAction = authActionClient.schema(selectCampaignSchema.shape.public_id).action(async ({ ctx: { userId }, parsedInput: campaignPublicId }) => {
  await deleteCampaign(userId, campaignPublicId);

  revalidatePath("/campaigns");
});
