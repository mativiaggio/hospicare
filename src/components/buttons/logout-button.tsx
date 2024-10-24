"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/api/use-logout";

export const Logout = () => {
  const { mutate } = useLogout();
  return (
    <div>
      <Button onClick={() => mutate()} variant={"secondary"}>
        Cerrar sesión
      </Button>
    </div>
  );
};
