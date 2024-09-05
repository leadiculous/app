import { optionalString } from "@/lib/zod";
import { campaigns } from "@/server/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const insertCampaignSchema = createInsertSchema(campaigns, {
  name: z.string().trim().min(1),
  description: optionalString(),
})
  .pick({
    description: true,
    name: true,
  })
  .extend({ tags: z.array(z.string().max(100)).optional() });
export type InsertCampaignSchema = z.infer<typeof insertCampaignSchema>;

export const selectCampaignSchema = createSelectSchema(campaigns).pick({
  name: true,
  public_id: true,
  createdAt: true,
  updatedAt: true,
  description: true,
});
export type SelectCampaignSchema = z.infer<typeof selectCampaignSchema>;
