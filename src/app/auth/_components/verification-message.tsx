"use client";

import { Alert } from "@/components/ui/alert";
import { type PropsWithChildren } from "react";

export function VerificationMessage({ children }: PropsWithChildren) {
  return (
    <>
      <Alert variant="success" className="font-bold">
        {children}
      </Alert>
      <p className="mt-8 font-semibold">
        Please <span className="underline">check your email</span> for a
        verification link.{" "}
        <span className="text-sm font-normal">You may close this tab</span>.
      </p>
    </>
  );
}
