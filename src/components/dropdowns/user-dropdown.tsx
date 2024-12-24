import {
  Cable,
  Github,
  Loader,
  Loader2,
  Lock,
  ShieldCheck,
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
import { useState } from "react";
import { MobileModeToggle } from "../buttons/theme-toggle";
import { useWindowSize } from "@/hooks/use-window-size";
import { useGetUserDocument } from "@/features/users/api/use-find-user-document";
import { useGetFilePreviewById } from "@/features/files/api/use-get-preview";

export function UserDropdown() {
  const { data, isLoading } = useCurrent();
  const { data: userDocument, isLoading: isLoadingDocument } =
    useGetUserDocument(data?.$id || null);

  const { data: fileUrl } = useGetFilePreviewById(
    userDocument?.document?.imageId || ""
  );

  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowSize();
  const isDesktop = width !== undefined && width >= 1280;

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  if (isLoading || isLoadingDocument) {
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
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange} modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar className="select-none cursor-pointer">
          <AvatarImage
            src={
              fileUrl ||
              `https://api.dicebear.com/6.x/initials/svg?seed=${data?.name}}`
            }
          />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 w-fit">
        <DropdownMenuLabel>
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 size={20} className="animate-spin" /> Cargando
            </span>
          ) : (
            <>
              <p className="text-2xl xl:text-lg">{data?.name}</p>
              <p className="text-sm xl:text-xs text-muted-foreground">
                {data?.email}
              </p>
            </>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {data?.labels.includes("admin") && (
            <>
              <DropdownMenuItem>
                <ShieldCheck className="!w-6 !h-6" />
                <span className="w-full flex">
                  <Link
                    className="!w-full text-xl xl:text-sm"
                    href={"/configuracion/admin"}
                    onClick={handleLinkClick}>
                    Admin
                  </Link>
                </span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem>
            <User className="!w-6 !h-6" />
            <span className="w-full flex">
              <Link
                className="!w-full text-xl xl:text-sm"
                href={"/configuracion/datos-personales"}
                onClick={handleLinkClick}>
                Datos personales
              </Link>
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Lock className="!w-6 !h-6" />
            <span className="w-full flex">
              <Link
                className="!w-full text-xl xl:text-sm"
                href={"/configuracion/seguridad"}
                onClick={handleLinkClick}>
                Seguridad
              </Link>
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Github className="!w-6 !h-6" />
          <span>
            <Link
              className="!w-full text-xl xl:text-sm"
              href={"https://github.com/mativiaggio/hospicare"}
              target="_blank"
              onClick={handleLinkClick}>
              GitHub
            </Link>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Cable className="!w-6 !h-6" />
          <span>
            <Link
              className="!w-full text-xl xl:text-sm"
              href={"/soporte"}
              onClick={handleLinkClick}>
              Soporte
            </Link>
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {!isDesktop && <MobileModeToggle />}
        <DropdownMenuItem onClick={handleLinkClick}>
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
