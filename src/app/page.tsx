import { auth } from "@/auth";
import { AppPage } from "@/components/pages/AppPage";
import { Page400 } from "@/components/pages/Page400";
import { redirect } from "next/navigation";

async function HomePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!session.user) {
    return (
      <div className="relative flex min-h-screen flex-col">
        <div className="flex flex-1 items-center justify-center">
          <Page400 />
        </div>
      </div>
    );
  }

  return <AppPage />;
}

export default HomePage;
