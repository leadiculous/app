import { cn } from "@/lib/utils";
import { checkPasswordComplexity } from "check-password-complexity";

export type PasswordComplexityMeterProps = {
  password: string;
};

export function PasswordComplexityMeter({
  password,
}: PasswordComplexityMeterProps) {
  const passwordComplexity = checkPasswordComplexity(password).value;

  return (
    <div className="grid gap-2">
      <div
        className={cn("border-l-2 p-2", {
          "border-red-500":
            passwordComplexity === "tooWeak" || passwordComplexity === "weak",
          "border-orange-500": passwordComplexity === "medium",
          "border-green-500": passwordComplexity === "strong",
        })}
      >
        <p className="font-semibold">Password Strength</p>
        <span className="text-sm">
          {passwordComplexity === "tooWeak" && "Too weak"}
          {passwordComplexity === "weak" && "Weak"}
          {passwordComplexity === "medium" && "Medium"}
          {passwordComplexity === "strong" && "Strong"}
        </span>
      </div>
    </div>
  );
}
