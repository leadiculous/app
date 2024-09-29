import { and, desc, eq, isNotNull } from "drizzle-orm";
import { db } from "../db";
import { campaigns, leads } from "../db/schema";

// TODO: implement pagination (infinite scroll)

export async function getLeads(userId: string, page = 1, limit = 100) {
  return db.query.leads.findMany({
    columns: {
      publicId: true,
      confidenceScoreThreshold: true,
      postAuthor: true,
      postTitle: true,
      postContent: true,
      postCreatedAt: true,
      postSource: true,
      postURL: true,
      postIsNSFW: true,
      createdAt: true,
    },
    with: {
      campaign: {
        columns: {
          publicId: true,
          name: true,
        },
      },
      topics: {
        columns: {
          confidenceScore: true,
          topic: true,
        },
      },
    },
    // Drizzle v1's query API doesn't support .where() on relations yet, so we have to use a subquery instead.
    // See: https://github.com/drizzle-team/drizzle-orm/discussions/1152 for more information.
    where: ({ campaignId }) =>
      isNotNull(
        db
          .select({ id: campaigns.id })
          .from(campaigns)
          .where(
            and(eq(campaigns.userId, userId), eq(campaigns.id, campaignId)),
          )
          .limit(1),
      ),
    orderBy: desc(leads.createdAt),
    limit,
    offset: (page - 1) * limit,
  });
}
