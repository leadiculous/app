import { optionalString } from "@/lib/zod";
import { campaigns } from "@/server/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { selectCampaignTagSchema } from "./tags";

export const insertCampaignSchema = createInsertSchema(campaigns, {
  name: z.string().trim().min(1).max(200),
  description: optionalString(),
})
  .pick({
    description: true,
    name: true,
  })
  .extend({ tags: z.array(z.string().min(1).max(100)).max(99).optional() });
export type InsertCampaignSchema = z.infer<typeof insertCampaignSchema>;

export const selectCampaignSchema = createSelectSchema(campaigns)
  .pick({
    name: true,
    publicId: true,
    createdAt: true,
    updatedAt: true,
    description: true,
  })
  .extend({ tags: z.array(selectCampaignTagSchema) });
export type SelectCampaignSchema = z.infer<typeof selectCampaignSchema>;
