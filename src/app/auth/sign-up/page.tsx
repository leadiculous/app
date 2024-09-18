import { Alert } from "@/components/ui/alert";
import { RegisterForm } from "./_components/register-form";

export default function SignUp({
  searchParams,
}: {
  searchParams: { complete?: string };
}) {
  const isNewSignUp = searchParams?.complete === "true";

  return isNewSignUp ? (
    <>
      <Alert variant="success" className="font-bold">
        Thanks for signing up!
      </Alert>
      <p className="mt-8 font-semibold">
        Please <span className="underline">check your email</span> for a
        verification link.{" "}
        <span className="text-sm font-normal">You may close this tab</span>.
      </p>
    </>
  ) : (
    <RegisterForm />
  );
}
