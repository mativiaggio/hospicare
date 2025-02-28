import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getAll } from "@/modules/notifications/backend/queries";
import { BellDot } from "lucide-react";
import ErrorPage from "@/components/pages/error";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatRelativeTime } from "@/lib/utils";

export const Notifications = async () => {
  const notifications = await getAll();
  // const client = await clerkClient();

  if (notifications === null) return <ErrorPage />;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="primary-outline"
          className="!aspect-square p-0 rounded-full">
          <BellDot />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-bold">Notificaciones</SheetTitle>
          <SheetDescription>
            Acá podés encontrar los últimos 20 movimientos del sistema.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
          <div className="grid gap-4 pr-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-2 border-b flex gap-2">
                <div className="aspect-square relative rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={notification.imageUrl || "/placeholder.svg"}
                    width={42}
                    height={42}
                    alt={`Foto de perfil de ${notification.firstName} ${notification.lastName}`}
                    className="aspect-square object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <p className="font-bold">
                      {notification.firstName} {notification.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatRelativeTime(notification.createdAt)}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {notification.notification}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
