"use client";

import { useState, useEffect } from "react";
import CustomFormField, { FormFieldType } from "@/components/custom-formfield";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { ticketSchema } from "@/features/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCurrent } from "@/features/auth/api/use-current";
import AddTicketFormSkeleton from "./add-ticket-form-skeleton";
import { useFindTicketById } from "../api/use-find-by-id";
import { Badge } from "@/components/ui/badge";
import { useUpdateTicket } from "../api/use-update-ticket";
import { SelectItem } from "@/components/ui/select";
import { TicketStatus } from "@/constants/appwrite";

type TicketFormValues = z.infer<typeof ticketSchema>;

export default function ViewTicketForm() {
  const params = useParams<{ id: string }>();
  const { mutate } = useUpdateTicket();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { data: currentUser, isLoading: isLoadingUser } = useCurrent();
  const {
    data: ticket,
    isLoading: isLoadingTicket,
    isFetching: isFetchingTicket,
  } = useFindTicketById(params.id);

  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: "",
      description: "",
      solution: "",
      status: "",
    },
  });

  useEffect(() => {
    if (ticket) {
      form.reset({
        title: ticket.title || "",
        description: ticket.description || "",
        solution: ticket.solution || "",
        status: ticket.status || "",
      });
    }
  }, [ticket, form]);

  async function onSubmit(values: TicketFormValues) {
    setIsSubmitting(true);
    const formattedValues = {
      ...values,
    };
    mutate({ param: { id: params.id }, json: formattedValues });
    setIsSubmitting(false);
    router.push("/soporte");
  }

  // Manejo de carga
  if (isLoadingUser || isLoadingTicket || isFetchingTicket) {
    return <AddTicketFormSkeleton />;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          Ticket creado por {ticket?.users?.name}{" "}
          {currentUser?.labels.includes("admin") ||
          currentUser?.labels.includes("developer") ? (
            <Badge>Modo desarrollador</Badge>
          ) : (
            <Badge>Modo lectura</Badge>
          )}
        </CardTitle>
        <CardDescription>
          {currentUser?.labels.includes("admin") ||
          currentUser?.labels.includes("developer")
            ? "Agrega la resolución si corresponse y actualiza el ticket"
            : "No posees permisos para actualizar el formulario."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="title"
                label="Título"
                placeholder="Título"
                control={form.control}
                defaultValue={form.getValues("title")}
                inputCustomClasses="!opacity-100"
                disabled
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                name="description"
                label="Descripción"
                placeholder="Descripción"
                control={form.control}
                defaultValue={form.getValues("description")}
                inputCustomClasses="resize-none !opacity-100"
                disabled
              />
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                name="status"
                label="Estado"
                control={form.control}
                defaultValue={form.getValues("status")}
                disabled={
                  isSubmitting ||
                  isLoadingTicket ||
                  !currentUser?.labels.includes("admin") ||
                  !currentUser?.labels.includes("developer")
                }>
                {TicketStatus.map((index, i) => (
                  <SelectItem key={index.id + i} value={index.value}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <p>{index.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                name="solution"
                label="Solución"
                placeholder="Solución"
                control={form.control}
                defaultValue={form.getValues("solution")}
                inputCustomClasses="resize-none !opacity-100"
                disabled={
                  isSubmitting ||
                  isLoadingTicket ||
                  !currentUser?.labels.includes("admin") ||
                  !currentUser?.labels.includes("developer")
                }
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  isLoadingTicket ||
                  !currentUser?.labels.includes("admin") ||
                  !currentUser?.labels.includes("developer")
                }>
                {isSubmitting ? "Guardando..." : "Guardar"}
              </Button>
              <Button
                variant={"outline"}
                onClick={() => router.push("/soporte")}>
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
