"use client";

import { type PropsWithChildren } from "react";
import { useAuth } from "./auth-provider";

type Props = PropsWithChildren;

export function SignedIn({ children }: Props) {
  const user = useAuth();
  return user ? <>{children}</> : null;
}

export function SignedOut({ children }: Props) {
  const user = useAuth();
  return user ? null : <>{children}</>;
}
