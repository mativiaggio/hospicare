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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MedicationFormValues, Medications } from "../types";
import { create } from "../backend/queries";
import { useToast } from "@/hooks/use-toast";
import { Submit } from "@/components/submit";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre del medicamento debe tener al menos 2 caracteres."),
  manufacterer: z.string(),
  routeOfAdministration: z.enum(["ORAL", "INTRAVENOUS"]),
});

interface NewRecordProps {
  details?: Partial<Medications>;
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
      manufacterer: details?.manufacterer || "",
      routeOfAdministration: details?.routeOfAdministration || "ORAL",
    },
  });

  const {
    control,
    handleSubmit,
    // formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<MedicationFormValues> = async (values) => {
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

      router.push("/medicamentos");
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
                <Input placeholder="Nombre del medicamento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Campo: Fabricante */}
        <FormField
          control={control}
          name="manufacterer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fabricante</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del fabricante" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Campo: Ruta de Administración */}
        <FormField
          control={control}
          name="routeOfAdministration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ruta de Administración</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ORAL">Oral</SelectItem>
                  <SelectItem value="INTRAVENOUS">Intravenosa</SelectItem>
                </SelectContent>
              </Select>
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
