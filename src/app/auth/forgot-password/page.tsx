import { ForgotPasswordForm } from "./_components/forgot-password-form";
import { VerificationMessage } from "../_components/verification-message";

export default function ForgotPassword({
  searchParams,
}: {
  searchParams: { complete?: string };
}) {
  const isPasswordResetLinkSent = searchParams.complete === "true";

  return isPasswordResetLinkSent ? (
    <VerificationMessage>Password reset requested!</VerificationMessage>
  ) : (
    <ForgotPasswordForm />
  );
}
