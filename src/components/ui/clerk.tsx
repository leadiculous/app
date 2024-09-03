"use client";

import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { cloneElement, type PropsWithChildren, type ReactElement } from "react";

export function ThemedClerkComponent({ children }: PropsWithChildren) {
  const { resolvedTheme } = useTheme();

  return cloneElement(children as ReactElement, {
    appearance: { baseTheme: resolvedTheme === "dark" ? dark : undefined },
  });
}
