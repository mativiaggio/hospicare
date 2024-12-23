import { Models } from "node-appwrite";

type WelcomeProps = {
  user: Models.User<Models.Preferences> | null;
};

export function Welcome({ user }: WelcomeProps) {
  return (
    <div className="prose py-6 xl:py-8">
      <h1 className="text-3xl xl:text-4xl font-semibold">
        Hola, {user?.name || "Invitado"}
        👋
      </h1>
      <p className="text-base xl:text-xl text-muted-foreground">
        Comienza a gestionar la organización
      </p>
    </div>
  );
}
