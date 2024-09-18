import { RegisterForm } from "./_components/register-form";
import { VerificationMessage } from "../_components/verification-message";

export default function SignUp({
  searchParams,
}: {
  searchParams: { complete?: string };
}) {
  const isNewSignUp = searchParams?.complete === "true";

  return isNewSignUp ? (
    <VerificationMessage>Thanks for signing up!</VerificationMessage>
  ) : (
    <RegisterForm />
  );
}
