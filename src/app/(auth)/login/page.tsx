import { getError } from "../auth/error/auth-error-mapping";
import { auth } from "@/auth";
import { SignInForm } from "@/components/auth/SignInForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PageParams } from "@/types/next";
import { AlertTriangle } from "lucide-react";
import { redirect } from "next/navigation";

export default async function SignInPage(props: PageParams<{}>) {
  const { errorMessage, error } = getError(props.searchParams.error);

  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col items-center justify-center gap-2">
            {/* <LogoSvg /> */}
            <p>Logo</p>
            <CardTitle>Sign in to your account</CardTitle>
          </CardHeader>
          <CardContent className="mt-8">
            <SignInForm />
          </CardContent>
          {error ? (
            <Alert>
              <AlertTriangle size={16} />
              <AlertDescription>{error}</AlertDescription>
              <AlertTitle>{errorMessage}</AlertTitle>
            </Alert>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
