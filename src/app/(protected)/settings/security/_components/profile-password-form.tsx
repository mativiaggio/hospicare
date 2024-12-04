"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { userUpdatePassword } from "@/features/schemas";
import { useUpdateProfilePassword } from "@/features/users/api/use-update-user-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export default function ProfilePasswordForm() {
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate } = useUpdateProfilePassword();

  const form = useForm<z.infer<typeof userUpdatePassword>>({
    resolver: zodResolver(userUpdatePassword),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const checkDisabled = useCallback(() => {
    const currentPassword = form.getValues("currentPassword");
    const newPassword = form.getValues("newPassword");
    const confirmPassword = form.getValues("confirmPassword");

    if (
      currentPassword !== "" &&
      newPassword !== "" &&
      confirmPassword !== "" &&
      newPassword === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [form]);

  useEffect(() => {
    const subscription = form.watch(() => {
      checkDisabled();
    });
    return () => subscription.unsubscribe();
  }, [form, checkDisabled]);

  const onSubmit = async (values: z.infer<typeof userUpdatePassword>) => {
    try {
      setIsLoading(true);
      setDisabled(true);

      await new Promise<void>((resolve, reject) => {
        mutate(
          { json: values },
          {
            onSuccess: () => resolve(),
            onError: (error) => reject(error),
          }
        );
      });

      setShowSuccess(true);
      setDisabled(true);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    } finally {
      setIsLoading(false);
      setDisabled(true);
      form.resetField("currentPassword");
      form.resetField("newPassword");
      form.resetField("confirmPassword");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-2xl mx-auto space-y-8 p-6">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Cambio de contraseña</h1>
        </div>

        <Separator />

        <section className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Contraseña Actual</Label>
              <FormField
                name="currentPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        id="currentPassword"
                        placeholder="Ingresa contraseña actual"
                        onInput={() => checkDisabled()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">Nueva Contraseña</Label>
              <FormField
                name="newPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        id="currentPassword"
                        placeholder="Ingresa la nueva contraseña"
                        onInput={() => checkDisabled()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">
                Confirmar Nueva Contraseña
              </Label>
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        id="confirmPassword"
                        placeholder="Repite la nueva contraseña"
                        onInput={() => checkDisabled()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </section>

        <Separator />

        <Button variant={disabled ? "outline" : "primary"} type="submit" className="w-full" disabled={disabled}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Guardando..." : "Guardar Cambios"}
        </Button>

        {showSuccess && (
          <Alert className="fixed bottom-4 right-4 w-96">
            <AlertTitle>Éxito</AlertTitle>
            <AlertDescription>
              Su contraseña ha sido actualizada con éxito.
            </AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  );
}
