import { LoginForm } from "./_components/login-form";

export default function Login({
  searchParams,
}: {
  searchParams: { reset?: string };
}) {
  const isPasswordReset = searchParams.reset === "true";

  return <LoginForm isPasswordReset={isPasswordReset} />;
}
