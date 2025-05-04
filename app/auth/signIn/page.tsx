import SignInClientComponent from "@/app/components/SignInClientComponent";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const callbackUrl = typeof resolvedSearchParams.callbackUrl === 'string' ? resolvedSearchParams.callbackUrl : "/dashboard";

  return <SignInClientComponent callbackUrl={callbackUrl} />;
}
