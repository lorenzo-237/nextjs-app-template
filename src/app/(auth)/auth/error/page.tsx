import { buttonVariants } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { ContactSupportDialog } from "@/features/contact/support/ContactSupportDialog";
import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from '@/components/pages/layout';
import type { PageParams } from '@/types/next';
import Link from 'next/link';
import { getError } from './auth-error-mapping';

export default async function AuthErrorPage(props: PageParams<{}>) {
  const { errorMessage, error } = getError(props.searchParams.error);

  return (
    <div className='flex h-full flex-col'>
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Authentification Error</LayoutTitle>
        </LayoutHeader>
        <LayoutContent>
          <Card>
            <CardHeader>
              <CardDescription>{error}</CardDescription>
              <CardTitle>{errorMessage}</CardTitle>
            </CardHeader>
            <CardFooter className='flex items-center gap-2'>
              <Link href='/' className={buttonVariants({ size: 'sm' })}>
                Home
              </Link>
              {/* <ContactSupportDialog /> */}
            </CardFooter>
          </Card>
        </LayoutContent>
      </Layout>
    </div>
  );
}
