import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/auth';
import type { PageParams } from '@/types/next';
import { AlertTriangle } from 'lucide-react';
import { redirect } from 'next/navigation';
import { getError } from '../error/auth-error-mapping';
import { SignInForm } from '@/components/auth/SignInForm';

export default async function AuthSignInPage(props: PageParams<{}>) {
  const { errorMessage, error } = getError(props.searchParams.error);

  const user = await auth();

  if (user) {
    redirect('/account');
  }

  return (
    <div className='flex h-full flex-col'>
      <div className='flex flex-1 items-center justify-center'>
        <Card className='w-full max-w-md'>
          <CardHeader className='flex flex-col items-center justify-center gap-2'>
            {/* <LogoSvg /> */}
            <p>Logo</p>
            <CardTitle>Sign in to your account</CardTitle>
          </CardHeader>
          <CardContent className='mt-8'>
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
