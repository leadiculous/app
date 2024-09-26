import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgSchema,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
  real as float,
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
  leads: many(leads),
}));

export const campaignTags = pgTable(
  "campaign_tags",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    campaignId: integer("campaign_id")
      .references(() => campaigns.id)
      .notNull(),
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

export const socialMediaEnum = pgEnum("social_media_source", ["reddit"]);

export const leads = pgTable("leads", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  publicId: publicId(),
  campaignId: integer("campaign_id")
    .references(() => campaigns.id)
    .notNull(),
  /**
   * The confidence score threshold that was used by the AI service to determine if matched topics are relevant.
   * This is a floating point number between 0 and 1, where 0.99+ is the highest possible value.
   */
  confidenceScoreThreshold: float("confidence_score_threshold").notNull(),
  /**
   * Type of social media where the lead was found.
   */
  postSource: socialMediaEnum("post_source").notNull(),
  /**
   * The author, username or name of the poster.
   */
  postAuthor: varchar("post_author").notNull(),
  /**
   * The time the post was created.
   */
  postCreatedAt: timestamp("post_created_at").notNull(),
  /**
   * The number of comments the post has.
   * This may be null if the source does not provide this information.
   */
  postNumComments: integer("post_num_comments"),
  /**
   * Whether the post is marked as NSFW (Not Safe For Work).
   * This may be null if the source does not provide this information.
   */
  postIsNSFW: boolean("post_is_nsfw"),
  /**
   * The number of likes or upvotes the post has.
   * This may be null if the source does not provide this information.
   */
  postLikes: integer("post_likes"),
  /**
   * Link to the post.
   */
  postURL: text("post_url").notNull(),
  /**
   * The title of the post.
   */
  postTitle: text("post_title").notNull(),
  /**
   * The body of the post.
   * This may be null if the source does not provide this information (title-only posts are possible).
   */
  postContent: text("post_content"),
  createdAt: createdAt(),
});

export const leadsRelations = relations(leads, ({ one, many }) => ({
  campaign: one(campaigns, {
    fields: [leads.campaignId],
    references: [campaigns.id],
  }),
  topics: many(leadTopics),
}));

export const leadTopics = pgTable("lead_topics", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  leadId: integer("lead_id")
    .references(() => leads.id)
    .notNull(),
  /**
   * The matched topic that the AI service determined to be relevant to this post.
   */
  topic: text("topic").notNull(),
  /**
   * The confidence score provided by the AI service for this topic in relation to its post.
   * This is a floating point number between 0 and 1, where 0.99+ is the highest possible value.
   */
  confidenceScore: float("confidence_score").notNull(),
});

export const leadTopicsRelations = relations(leadTopics, ({ one }) => ({
  lead: one(leads, {
    fields: [leadTopics.leadId],
    references: [leads.id],
  }),
}));
