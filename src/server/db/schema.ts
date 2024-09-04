import { relations, sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

const updatedAt = () =>
  timestamp("updated_at", { withTimezone: true })
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`)
    .notNull();

const createdAt = () =>
  timestamp("created_at", { withTimezone: true }).defaultNow().notNull();

const publicId = () =>
  varchar("public_id").unique().$defaultFn(createId).notNull();

export const campaigns = pgTable("campaigns", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  public_id: publicId(),
  clerk_user_id: varchar("clerk_user_id").notNull(),
  name: varchar("name", { length: 200 }).unique().notNull(),
  description: text("description"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const campaignsRelations = relations(campaigns, ({ many }) => ({
  tags: many(campaignTags),
}));

export const campaignTags = pgTable(
  "campaign_tags",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    campaignId: integer("campaign_id").notNull(),
    tag: varchar("tag", { length: 100 }).notNull(),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => ({
    uniqueTagPerCampaign: uniqueIndex("unique_tag_per_campaign").on(
      sql`lower(${table.tag})`,
      table.campaignId,
    ),
  }),
);

export const campaignTagsRelations = relations(campaignTags, ({ one }) => ({
  campaign: one(campaigns, {
    fields: [campaignTags.campaignId],
    references: [campaigns.id],
  }),
}));

export const tagSuggestions = pgTable("tag_suggestions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  tag: varchar("tag", { length: 100 }).unique().notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
