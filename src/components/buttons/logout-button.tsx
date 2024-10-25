"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/api/use-logout";
import { LogOut } from "lucide-react";

export const Logout = () => {
  const { mutate } = useLogout();
  return (
    <div>
      <Button
        onClick={() => mutate()}
        variant={"inherit"}
        className="[&>svg]:size-4 [&>svg]:shrink-0">
        <LogOut />
        <span>Cerrar sesión</span>
      </Button>
    </div>
  );
};
