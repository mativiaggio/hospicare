import {
  Github,
  LifeBuoy,
  Loader,
  Loader2,
  Settings,
  User,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrent } from "@/features/auth/api/use-current";
import Link from "next/link";
import { Logout } from "../buttons/logout-button";

export function UserDropdown() {
  const { data, isLoading } = useCurrent();

  if (isLoading) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="h-[40px] w-[40px] bg-transparent rounded-full flex items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        </DropdownMenuTrigger>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar className="select-none cursor-pointer">
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${data?.name}}`}
          />
          <AvatarFallback>{data?.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {isLoading ? (
            <>
              <span className="flex items-center gap-2">
                <Loader2 size={20} className="animate-spin" /> Cargando
              </span>
            </>
          ) : (
            <>
              <p className="text-lg">{data?.name}</p>
              <p className="text-xs text-muted-foreground">{data?.email}</p>
            </>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            <span className="w-full flex">
              <Link className="!w-full" href={"/settings/profile"}>
                Perfil
              </Link>
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            <span className="w-full flex">
              <Link className="!w-full" href={"/settings"}>
                Configuración
              </Link>
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Github />
          <span>
            <Link
              href={"https://github.com/mativiaggio/hospicare"}
              target="_blank">
              GitHub
            </Link>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LifeBuoy />
          <span>
            <Link
              // href={"https://github.com/mativiaggio/hospicare/issues/new"}
              href={"/soporte"}>
              Soporte
            </Link>
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
