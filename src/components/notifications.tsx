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
import { Bell } from "lucide-react";
import ErrorPage from "./pages/error";
import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { formatRelativeTime } from "@/lib/utils";

export const Notifications = async () => {
  const notifications = await getAll();
  const client = await clerkClient();

  if (notifications === null) return <ErrorPage />;

  const notificationsWithUser = await Promise.all(
    notifications.map(async (notification) => {
      try {
        const user = await client.users.getUser(notification.clerkId);
        return { ...notification, user };
      } catch (error) {
        console.log(error);
        return null;
      }
    })
  );

  // Filtramos las notificaciones nulas
  const validNotifications = notificationsWithUser.filter(
    (notification): notification is NonNullable<typeof notification> =>
      notification !== null
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="primary-outline"
          className="!aspect-square p-0 rounded-full">
          <Bell />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-bold">Notificaciones</SheetTitle>
          <SheetDescription>
            Acá podés encontrar los últimos movimientos del sistema.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
          <div className="grid gap-4 pr-4">
            {validNotifications.map((notification) => (
              <div key={notification.id} className="p-2 border-b flex gap-2">
                <div className="w-[42px] h-[42px] aspect-square relative rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={notification.user.imageUrl || "/placeholder.svg"}
                    fill
                    alt={`Foto de perfil de ${notification.user.firstName} ${notification.user.lastName}`}
                    className="aspect-square object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <p className="font-bold">
                      {notification.user.firstName} {notification.user.lastName}
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
