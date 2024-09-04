"use server";

import { createCampaign as createCampaignService } from "@/server/services/campaign";
import { insertCampaignSchema } from "@/shared/schemas/campaign";
import { auth } from "@clerk/nextjs/server";

export async function createCampaign(formData: FormData) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to create a campaign");
  }

  const rawFormData = {
    name: formData.get("name"),
    tags: formData
      .get("tags")
      ?.toString()
      .split(",")
      ?.map((tag) => tag.trim()),
    description: formData.get("description"),
  };

  const body = insertCampaignSchema.safeParse(rawFormData);

  if (!body.success) {
    return { message: "Validation error", errors: body.error.errors };
  }

  const res = await createCampaignService(userId, body.data);

  if (!res) {
    return { message: "Failed to create campaign" };
  }

  return res;
}
