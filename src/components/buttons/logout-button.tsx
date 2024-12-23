"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/api/use-logout";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";

interface LogoutProps {
  className?: string;
  textClassName?: string;
  iconClassName?: string;
}

export const Logout = ({
  className,
  textClassName,
  iconClassName,
}: LogoutProps) => {
  const { mutate } = useLogout();
  return (
    <div>
      <Button
        onClick={() => mutate()}
        variant={"inherit"}
        className={cn("[&>svg]:size-4 [&>svg]:shrink-0", className)}>
        <LogOut className={cn("!w-6 !h-6", iconClassName)} />
        <span className={cn("text-xl xl:text-sm", textClassName)}>
          Cerrar sesión
        </span>
      </Button>
    </div>
  );
};
