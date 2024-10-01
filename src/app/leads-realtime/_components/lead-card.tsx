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
import { Flag, Megaphone, MoreHorizontal, Tags } from "lucide-react";
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const REDDIT_URL = "https://www.reddit.com";

export type LeadCardProps = { lead: SelectLeadSchema };

export function LeadCard({ lead }: LeadCardProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card
          key={lead.id}
          className={"cursor-pointer hover:border-primary"}
        >
          <div className="flex items-center gap-4 p-6">
            <RedditIcon className="size-10" />
            <CardHeader className="flex-1 p-0">
              <CardTitle>{lead.postTitle} </CardTitle>
              <CardDescription>
                <Description lead={lead} />
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
              {/* TODO: fix; clamping works but you can still "scroll" inside the MD renderer using tabs, messing it up. See reddit homepage as an example */}
              <Markdown className="line-clamp-3 text-ellipsis rounded-lg border p-4">
                {sanitizeContent(lead.postContent)}
              </Markdown>
            </CardContent>
          )}
          <CardFooter>
            <MatchDetails lead={lead} />
          </CardFooter>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-full space-y-4 overflow-scroll lg:max-w-3xl">
        <SheetHeader>
          <SheetTitle>{lead.postTitle}</SheetTitle>
          <SheetDescription className="space-y-2">
            <Description lead={lead} />
            <MatchDetails lead={lead} />
          </SheetDescription>
        </SheetHeader>
        {lead.postContent && (
          <Markdown className="rounded-lg border p-4">
            {sanitizeContent(lead.postContent)}
          </Markdown>
        )}
        <SheetFooter>
          <div className="flex w-full justify-between">
            <SheetClose asChild>
              <Button type="button" variant="outline" iconLeft={<Flag />}>
                Report bad lead
              </Button>
            </SheetClose>
            <SheetClose asChild>
              {/* TODO: implement save to campaign */}
              <Button type="button" iconLeft={<Megaphone />}>
                Save to campaign
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function Description({ lead }: Pick<LeadCardProps, "lead">) {
  return (
    <span>
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
    </span>
  );
}

function MatchDetails({ lead }: Pick<LeadCardProps, "lead">) {
  return (
    <div className="flex gap-4">
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
    </div>
  );
}

function extractSubreddit(url: string) {
  const match = /\/r\/([^\/]+)/.exec(url);
  return match ? match[1] : null;
}

function sanitizeContent(content: string) {
  return content.replaceAll("\\n", "\n");
}
