import { auth } from "@/auth";
import { DashboardNavigation } from "@/components/navigation/DashboardNavigation";
import type { LayoutParams } from "@/types/next";
import { redirect } from "next/navigation";

export default async function RouteLayout(props: LayoutParams<{}>) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!session.user) {
    redirect("/login");
  }

  return <DashboardNavigation>{props.children}</DashboardNavigation>;
}
