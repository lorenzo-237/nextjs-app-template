import { SignOutButton } from "../auth/buttons/SignOutButton";

export type AppPageProps = {};

export const AppPage = (props: AppPageProps) => {
  return (
    <div>
      <h1>Page app une fois connecté</h1>
      <SignOutButton />
    </div>
  );
};
