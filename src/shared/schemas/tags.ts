import { createSelectSchema } from "drizzle-zod";
import { campaignTags } from "@/server/db/schema";
import { type z } from "zod";

export const selectCampaignTagSchema = createSelectSchema(campaignTags);
export type SelectCampaignTagSchema = z.infer<typeof selectCampaignTagSchema>;
