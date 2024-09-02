"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";

const trialCardVariants = cva(null, {
  variants: {
    variant: {
      desktop: "p-2 pt-0 md:p-4",
      mobile: null,
    },
  },
});

export type TrialCardProps = VariantProps<typeof trialCardVariants>;

export function TrialCard({ variant = "desktop" }: TrialCardProps) {
  return (
    <Card>
      <CardHeader className={trialCardVariants({ variant })}>
        <CardTitle>Free trial active</CardTitle>
        <CardDescription>
          Upgrade your plan to unlock all features and keep access to the
          platform when your evaluation period ends.
        </CardDescription>
      </CardHeader>
      <CardContent
        className={trialCardVariants({
          variant,
          className: variant === "desktop" ? "md:pt-0" : undefined,
        })}
      >
        <Button size="sm" className="w-full">
          Upgrade
        </Button>
      </CardContent>
    </Card>
  );
}
