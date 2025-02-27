"use client";

import * as z from "zod";
import React, { useState } from "react";
import { v4 } from "uuid";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Submit } from "@/components/submit";
import { useRouter } from "next/navigation";
import { HealthInsuranceFormValues, HealthInsurances } from "../types";
import { create } from "../backend/query";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z
    .string()
    .min(
      2,
      "El nombre de la seguridad social debe tener al menos 2 caracteres."
    ),
  private: z.boolean(),
});

interface NewRecordProps {
  details?: Partial<HealthInsurances>;
}

const NewRecord = ({ details }: NewRecordProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: details?.name || "",
      private: details?.private || false,
    },
  });

  const {
    control,
    handleSubmit,
    // formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<HealthInsuranceFormValues> = async (values) => {
    try {
      setIsSubmitting(true);
      const response = await create({
        id: details?.id ? details.id : v4(),
        ...values,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      if (response === null) throw new Error("Ocurrió un error");

      toast({
        title: "Éxito",
        description: response.message,
        variant: "success",
      });

      router.push("/seguridad-social");
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      toast({
        variant: "destructive",
        title: "Oops!",
        description: "Ocurrió un error al crear la agencia.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Campo: Nombre */}
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre de la organización" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="private"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <FormItem>
              <FormLabel className="sr-only">Es privado</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={value}
                    onCheckedChange={(checked) => onChange(checked)}
                    onBlur={onBlur}
                    ref={ref}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Es privada
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Submit
          type="submit"
          isLoading={isSubmitting}
          className="overflow-hidden"
        />
      </form>
    </Form>
  );
};

export default NewRecord;
