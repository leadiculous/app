import { relations, sql } from "drizzle-orm";
import {
  integer,
  pgSchema,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
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

// The auth schema was already created for us by supabase.
// Thus, we can simply reference the users table from the auth schema
// in order to create foreign keys to it from our own tables.
const users = pgSchema("auth").table("users", {
  id: uuid("id").primaryKey(),
});

export const campaigns = pgTable("campaigns", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  publicId: publicId(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
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
