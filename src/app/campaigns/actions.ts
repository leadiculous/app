"use server";

import { authActionClient } from "@/lib/type-safe-action";
import {
  createCampaign,
  deleteCampaigns,
  isExistingCampaign,
  updateCampaign,
} from "@/server/services/campaign";
import {
  insertCampaignSchema,
  selectCampaignSchema,
} from "@/lib/schemas/campaign";
import { returnValidationErrors } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createOrUpdateCampaignAction = authActionClient
  .schema(insertCampaignSchema)
  .bindArgsSchemas<[public_id: z.ZodOptional<z.ZodString>]>([
    selectCampaignSchema.shape.public_id.optional(),
  ])
  .action(
    async ({
      ctx: { userId },
      parsedInput,
      bindArgsParsedInputs: [publicId],
    }) => {
      let campaign;

      // update existing campaign
      if (publicId) {
        campaign = await updateCampaign(userId, publicId, parsedInput);
      } else {
        // create new campaign
        if (await isExistingCampaign(userId, parsedInput.name)) {
          returnValidationErrors(insertCampaignSchema, {
            name: {
              _errors: ["Another campaign with this name already exists"],
            },
          });
        }

        campaign = await createCampaign(userId, parsedInput);
      }

      revalidatePath("/campaigns");

      return campaign;
    },
  );

export const deleteCampaignsAction = authActionClient
  .schema(z.array(selectCampaignSchema.shape.public_id))
  .action(async ({ ctx: { userId }, parsedInput: campaignPublicIds }) => {
    await deleteCampaigns(userId, campaignPublicIds);

    revalidatePath("/campaigns");
  });
