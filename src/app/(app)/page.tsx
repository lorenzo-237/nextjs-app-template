import { auth } from "@/auth";
import { AppPage } from "@/components/pages/AppPage";
import { redirect } from "next/navigation";

async function HomePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!session.user) {
    redirect("/login");
  }

  return <AppPage />;
}

export default HomePage;
