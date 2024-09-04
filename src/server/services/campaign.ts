import { eq } from "drizzle-orm";
import { db } from "../db";
import { campaigns, campaignTags } from "../db/schema";
import { type InsertCampaignSchema } from "@/shared/schemas/campaign";

export async function getCampaigns(userId: string) {
  return db.query.campaigns.findMany({
    where: eq(campaigns.clerk_user_id, userId),
    with: { tags: true },
  });
}

export async function createCampaign(
  userId: string,
  data: InsertCampaignSchema,
) {
  return db.transaction(async (tx) => {
    const [insertedCampaign] = await tx
      .insert(campaigns)
      .values({
        clerk_user_id: userId,
        name: data.name,
        description: data.description,
      })
      .returning({ campaignId: campaigns.id });
    const campaignId = insertedCampaign?.campaignId;

    if (!campaignId) {
      throw new Error("Failed to create campaign");
    }

    if (data.tags && data.tags.length > 0) {
      await tx
        .insert(campaignTags)
        .values(data.tags.map((tag) => ({ campaignId, tag })));
    }

    return tx.query.campaigns.findFirst({
      columns: {
        public_id: true,
        name: true,
        description: true,
        createdAt: true,
      },
      where: eq(campaigns.id, campaignId),
      with: { tags: { columns: { tag: true, createdAt: true } } },
    });
  });
}
