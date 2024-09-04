"use client";

import EmptyCampaignsLight from "@/assets/empty_campaigns_light.svg";
import EmptyCampaignsDark from "@/assets/empty_campaigns_dark.svg";
import { useTheme } from "next-themes";

export function EmptyStatePlaceholder() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="size-placeholder">
      {resolvedTheme === undefined && <div className="size-full"></div>}
      {resolvedTheme === "light" && <EmptyCampaignsLight />}
      {resolvedTheme === "dark" && <EmptyCampaignsDark />}
    </div>
  );
}

export default EmptyStatePlaceholder;
