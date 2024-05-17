import { LandingHeader } from "./LandingHeader";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

export type NavigationLayoutProps = ComponentPropsWithoutRef<"div"> & {};

export const NavigationLayout = ({
  children,
  className,
  ...props
}: NavigationLayoutProps) => {
  return (
    <div
      className={cn(
        "relative flex h-fit flex-col bg-background text-foreground",
        className,
      )}
      {...props}
    >
      <div className="mt-20"></div>
      <LandingHeader />
      {children}
    </div>
  );
};
