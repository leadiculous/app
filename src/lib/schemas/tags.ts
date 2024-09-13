import { createSelectSchema } from "drizzle-zod";
import { campaignTags } from "@/server/db/schema";
import { type z } from "zod";

export const selectCampaignTagSchema = createSelectSchema(campaignTags).pick({
  tag: true,
  createdAt: true,
});
export type SelectCampaignTagSchema = z.infer<typeof selectCampaignTagSchema>;
