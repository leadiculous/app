"use client";

import { type PropsWithClassName } from "@/lib/types";
import { cn } from "@/lib/utils";
import { type PropsWithChildren } from "react";

export type LogoProps = PropsWithClassName<
  PropsWithChildren<{
    as: "h1" | "h2";
  }>
>;

export function Logo({ as, children, className }: LogoProps) {
  const Component = as;

  return (
    <Component className={cn("bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text font-bold text-transparent", className)}>
      {children}
    </Component>
  );
}
