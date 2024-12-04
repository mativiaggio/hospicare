/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { userSchema } from "@/features/schemas";
import { useUpdateProfileDocument } from "@/features/users/api/use-update-user-document";
import { useUpdateProfileEmail } from "@/features/users/api/use-update-user-email";
import { useUpdateProfileName } from "@/features/users/api/use-update-user-name";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  data: { name: string; email: string };
}

export default function ProfileSettingsForm({ data }: Props) {
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate: mutateName } = useUpdateProfileName();
  const { mutate: mutateEmail } = useUpdateProfileEmail();
  const { mutate: mutateDocument } = useUpdateProfileDocument();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: data.name,
      email: data.email,
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    try {
      setFormIsLoading(true);

      await new Promise<void>((resolve, reject) => {
        mutateName(
          { json: values },
          {
            onSuccess: () => resolve(),
            onError: (error) => reject(error),
          }
        );
      });

      await new Promise<void>((resolve, reject) => {
        mutateEmail(
          { json: values },
          {
            onSuccess: () => resolve(),
            onError: (error) => reject(error),
          }
        );
      });

      await new Promise<void>((resolve, reject) => {
        mutateDocument(
          { json: values },
          {
            onSuccess: () => resolve(),
            onError: (error) => reject(error),
          }
        );
      });

      setShowSuccess(true);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    } finally {
      setFormIsLoading(false);
      form.resetField("password");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-2xl mx-auto space-y-8 p-6">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Configuración del Perfil</h1>
          <p className="text-muted-foreground">
            Administre la configuración de su cuenta y establezca las
            preferencias de correo electrónico.
          </p>
        </div>

        <Separator />

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Información Personal</h2>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${data?.name}}`}
                alt="Foto de perfil"
              />
              <AvatarFallback>{data?.name}</AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} id="name" placeholder="John Doe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Contraseña</Label>
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        placeholder="Es necesaria la contraseña para guardar"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Link
              href={"/settings/security"}
              className="text-sm hover:underline font-semibold mt-2">
              ¿Desea cambiar la contraseña? Click aquí
            </Link>
          </div>
        </section>

        <Separator />

        <Button variant={!form.getValues("password") ? "outline" : "primary"} type="submit" className="w-full" disabled={formIsLoading || !form.getValues("password")}>
          {formIsLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {formIsLoading ? "Guardando..." : "Guardar Cambios"}
        </Button>

        {showSuccess && (
          <Alert className="fixed bottom-4 right-4 w-96">
            <AlertTitle>Éxito</AlertTitle>
            <AlertDescription>
              Su perfil ha sido actualizado con éxito.
            </AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  );
}
