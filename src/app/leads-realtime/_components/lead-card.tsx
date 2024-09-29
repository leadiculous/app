"use client";

import { type SelectLeadSchema } from "@/lib/schemas/leads";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Megaphone, MoreHorizontal, Tags } from "lucide-react";
import RedditIcon from "@/../public/images/reddit-logo.svg";
import Link from "next/link";
import { type UrlObject } from "url";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/i18n";
import { Markdown } from "@/components/ui/markdown";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const REDDIT_URL = "https://www.reddit.com";

export type LeadCardProps = { lead: SelectLeadSchema };

export function LeadCard({ lead }: LeadCardProps) {
  return (
    <Card key={lead.publicId}>
      {lead.postSource === "reddit" && <RedditCard lead={lead} />}
    </Card>
  );
}

function RedditCard({ lead }: LeadCardProps) {
  return (
    <>
      <div className="flex items-center gap-4 p-6">
        <RedditIcon className="size-10" />
        <CardHeader className="flex-1 p-0">
          <CardTitle>{lead.postTitle} </CardTitle>
          <CardDescription>
            Posted by{" "}
            <Link
              href={`${REDDIT_URL}/user/${lead.postAuthor}`}
              className="text-card-foreground/85 hover:underline"
              target="_blank"
            >
              u/
              {lead.postAuthor}
            </Link>{" "}
            to{" "}
            <Link
              href={`${lead.postURL}` as unknown as UrlObject}
              className="text-card-foreground/85 hover:underline"
              target="_blank"
            >
              r/{extractSubreddit(lead.postURL)}
            </Link>{" "}
            <span title={formatDate(lead.postCreatedAt)}>
              {formatDistanceToNow(new Date(lead.postCreatedAt), {
                includeSeconds: true,
                addSuffix: true,
              })}
            </span>
            {lead.postIsNSFW && (
              <span className="block font-semibold text-destructive">NSFW</span>
            )}
          </CardDescription>
        </CardHeader>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuCheckboxItem checked={false}>
              {/* TODO: save to campaign */}
              Save to campaign
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={false}>
              {/* TODO: report bad lead (saved to our analytics backend; allow the user to submit a description, maybe 1-5 stars to indicate quality ) */}
              Report bad lead
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {lead.postContent && (
        <CardContent>
          <Markdown className="text-sm">
            {sanitizeContent(lead.postContent)}
          </Markdown>
        </CardContent>
      )}
      <CardFooter className="flex gap-4">
        <div className="flex items-center gap-2">
          <Megaphone className="size-4" />
          <p>{lead.campaign.name}</p>
        </div>

        <div className="flex items-center gap-2">
          <Tags className="size-4" />
          <div className="flex flex-wrap gap-2">
            {lead.topics.map(({ topic, confidenceScore }) => (
              <Badge
                key={topic}
                variant="secondary"
                title={`Matches topic "${topic}" with AI confidence score ${confidenceScore}`}
              >
                <span>{topic}</span>
                <span className="ml-2 bg-black">
                  {confidenceScore.toFixed(2)}
                </span>
              </Badge>
            ))}
          </div>
        </div>
      </CardFooter>
    </>
  );
}

function extractSubreddit(url: string) {
  const match = /\/r\/([^\/]+)/.exec(url);
  return match ? match[1] : null;
}

function sanitizeContent(content: string) {
  return content.replaceAll("\\n", "\n");
}
