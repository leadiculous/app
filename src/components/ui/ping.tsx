import { cn } from "@/lib/utils";

export type PingProps = {
  variant?: "connected" | "connecting" | "disconnected";
};

export function Ping({ variant = "connected" }: PingProps) {
  return (
    <span className="relative flex size-3">
      <span
        className={cn(
          "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
          {
            "bg-green-400": variant === "connected",
            "bg-yellow-400": variant === "connecting",
            "bg-red-400": variant === "disconnected",
          },
        )}
      ></span>
      <span
        className={cn("relative inline-flex h-3 w-3 rounded-full", {
          "bg-green-500": variant === "connected",
          "bg-yellow-500": variant === "connecting",
          "bg-red-500": variant === "disconnected",
        })}
      ></span>
    </span>
  );
}
