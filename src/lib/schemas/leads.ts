import { campaigns, leads, leadTopics } from "@/server/db/schema";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const selectLeadSchema = createSelectSchema(leads)
  .pick({
    id: true,
    confidenceScoreThreshold: true,
    postAuthor: true,
    postTitle: true,
    postContent: true,
    postCreatedAt: true,
    postSource: true,
    postURL: true,
    postIsNSFW: true,
    createdAt: true,
  })
  .extend({
    campaign: createSelectSchema(campaigns).pick({
      publicId: true,
      name: true,
    }),
    topics: z.array(
      createSelectSchema(leadTopics).pick({
        confidenceScore: true,
        topic: true,
      }),
    ),
  });
export type SelectLeadSchema = z.infer<typeof selectLeadSchema>;
