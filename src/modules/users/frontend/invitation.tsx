"use client";
import React from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { sendInvitation } from "../backend/queries";
import { Submit } from "@/components/submit";

const Invitation: React.FC = () => {
  const { toast } = useToast();
  const userDataSchema = z.object({
    email: z.string().email(),
  });

  const form = useForm<z.infer<typeof userDataSchema>>({
    resolver: zodResolver(userDataSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userDataSchema>) => {
    try {
      const response = await sendInvitation(values.email);

      if (response === null) throw new Error("Ocurrió un error");

      toast({
        title: "Éxito",
        description: "Invitación enviada con éxito.",
        variant: "success",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error.",
        description:
          "Ocurrió un error al enviar la invitación. Intente nuevamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Submit
          isLoading={form.formState.isSubmitting}
          title="Invitar"
          className="mt-2">
          Enviar invitación
        </Submit>
      </form>
    </Form>
  );
};

export default Invitation;
