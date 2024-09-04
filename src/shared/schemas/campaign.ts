import { campaigns } from "@/server/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const insertCampaignSchema = createInsertSchema(campaigns)
  .pick({
    description: true,
    name: true,
    public_id: true,
  })
  .extend({ tags: z.array(z.string().max(100)).optional() });
export type InsertCampaignSchema = z.infer<typeof insertCampaignSchema>;

export const selectCampaignSchema = createSelectSchema(campaigns).omit({
  id: true,
  clerk_user_id: true,
});
export type SelectCampaignSchema = z.infer<typeof selectCampaignSchema>;
