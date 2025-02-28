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
import { GuestFormValues, Guests } from "../types";
import { create, update } from "../backend/queries";
import { useToast } from "@/hooks/use-toast";
import { Submit } from "@/components/submit";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  admissionDate: z.coerce.date().default(new Date()),
  hospitalizationDate: z.coerce.date().nullable(),
  firstNames: z
    .string()
    .min(2, "El nombre del medicamento debe tener al menos 2 caracteres."),
  lastNames: z
    .string()
    .min(2, "El nombre del medicamento debe tener al menos 2 caracteres."),
  birthdate: z.coerce.date(),
  dni: z.coerce
    .number()
    .min(10000000, "DNI no válido")
    .max(99999999, "DNI no válido"),
  country: z.string().nullable(),
  state: z.string().nullable(),
  city: z.string().nullable(),
  zipCode: z.coerce.number().nullable(),
  neighborhood: z.string().nullable(),
  addressStreetName: z.string().nullable(),
  addressStreetNumber: z.coerce.number().nullable(),
  referringPerson: z.string().nullable(),
  informationLevel: z.enum(["TOTAL", "PARTIAL", "NONE"]).nullable(),
  religion: z
    .enum([
      "NONE",
      "CATHOLIC",
      "JEWISH",
      "EVANGELICAL",
      "MORMON",
      "JEHOVAHS_WITNESS",
      "OTHER",
    ])
    .nullable(),
  funeralService: z.boolean().default(false),
  oncologicalDisease: z.boolean().default(false),
  tumor: z.string().nullable(),
  metastasis: z.boolean().default(false),
  metastasisLocation: z.string().nullable(),
  personalHistory: z.string().nullable(),
  ecog: z.enum(["ZERO", "ONE", "TWO", "THREE", "FOUR", "FIVE"]).nullable(),
  specificOncologicalTreatment: z
    .enum(["NONE", "DEFINITIVE_SUSPENSION", "NON_CONVENTIONAL"])
    .nullable(),
  surgery: z.string().nullable(),
  radiotherapy: z.string().nullable(),
  chemotherapy: z.string().nullable(),
  hormonetherapy: z.string().nullable(),
  opioidTreatment: z.boolean().default(false),
  opioidName: z.string().nullable(),
  healthInsuranceNumber: z.string().nullable(),
  familyComposition: z.string().nullable(),
  familyDoctor: z.string().nullable(),
  complementaryStudies: z.string().nullable(),
  status: z.enum(["ALIVE", "PENDING", "DEAD"]).nullable(),
  deathDate: z.coerce.date().nullable(),
  diseaseId: z.string().nullable(),
  healthInsuranceId: z.string().nullable(),
});

interface RecordProps {
  details?: Partial<Guests>;
}

const Record = ({ details }: RecordProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      admissionDate: details?.admissionDate || new Date(),
      hospitalizationDate: details?.hospitalizationDate || null,
      firstNames: details?.firstNames || "",
      lastNames: details?.lastNames || "",
      birthdate: details?.birthdate,
      dni: details?.dni || 0,
      country: details?.country || "Argentina",
      state: details?.state || null,
      city: details?.city || null,
      zipCode: details?.zipCode || 0,
      neighborhood: details?.neighborhood || null,
      addressStreetName: details?.addressStreetName || null,
      addressStreetNumber: details?.addressStreetNumber || 0,
      referringPerson: details?.referringPerson || null,
      informationLevel: details?.informationLevel || null,
      religion: details?.religion || null,
      funeralService: details?.funeralService || false,
      oncologicalDisease: details?.oncologicalDisease || false,
      tumor: details?.tumor || null,
      metastasis: details?.metastasis || false,
      metastasisLocation: details?.metastasisLocation || null,
      personalHistory: details?.personalHistory || null,
      ecog: details?.ecog || null,
      specificOncologicalTreatment:
        details?.specificOncologicalTreatment || null,
      surgery: details?.surgery || null,
      radiotherapy: details?.radiotherapy || null,
      chemotherapy: details?.chemotherapy || null,
      hormonetherapy: details?.hormonetherapy || null,
      opioidTreatment: details?.opioidTreatment || false,
      opioidName: details?.opioidName || null,
      healthInsuranceNumber: details?.healthInsuranceNumber || null,
      familyComposition: details?.familyComposition || null,
      familyDoctor: details?.familyDoctor || null,
      complementaryStudies: details?.complementaryStudies || null,
      status: details?.status || null,
      deathDate: details?.deathDate || null,
      diseaseId: details?.diseaseId || null,
      healthInsuranceId: details?.healthInsuranceId || null,
    },
  });

  const {
    control,
    handleSubmit,
    // formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<GuestFormValues> = async (values) => {
    try {
      setIsSubmitting(true);
      console.log("details?.id", details?.id);

      let response = null;
      if (!details?.id) {
        response = await create({
          id: v4(),
          ...values,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else {
        response = await update({
          id: details.id,
          ...values,
          createdAt: details.createdAt || new Date(),
          updatedAt: new Date(),
        });
      }

      if (response === null) throw new Error("Ocurrió un error");

      toast({
        title: "Éxito",
        description: response.message,
        variant: "success",
      });

      router.push("/huespedes");
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={control}
          name="admissionDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de admisión</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Fecha de admisión"
                  value={
                    field.value
                      ? new Date(field.value).toISOString().substring(0, 10)
                      : ""
                  }
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="hospitalizationDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de hospitalización</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Fecha de hospitalización"
                  value={
                    field.value
                      ? new Date(field.value).toISOString().substring(0, 10)
                      : ""
                  }
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="firstNames"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombres</FormLabel>
              <FormControl>
                <Input placeholder="Nombres del huésped" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="lastNames"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellidos</FormLabel>
              <FormControl>
                <Input placeholder="Apellidos del huésped" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="birthdate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de nacimiento</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Fecha de hospitalización"
                  value={
                    field.value
                      ? new Date(field.value).toISOString().substring(0, 10)
                      : ""
                  }
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="dni"
          render={({ field }) => (
            <FormItem>
              <FormLabel>DNI</FormLabel>
              <FormControl>
                <Input placeholder="DNI" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>País</FormLabel>
              <FormControl>
                <Input
                  placeholder="País"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provincia</FormLabel>
              <FormControl>
                <Input
                  placeholder="Provincia"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ciudad</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ciudad"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código postal</FormLabel>
              <FormControl>
                <Input
                  placeholder="Código postal"
                  value={field.value || undefined}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Barrio</FormLabel>
              <FormControl>
                <Input
                  placeholder="Barrio"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="addressStreetName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección (calle)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Dirección (calle)"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="addressStreetNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección (número)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Dirección (número)"
                  value={field.value || undefined}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="referringPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quién lo refiere</FormLabel>
              <FormControl>
                <Input
                  placeholder="Quién lo refiere"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="informationLevel"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Informado</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                }}
                defaultValue={field.value || undefined}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opción..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="NONE">No informado</SelectItem>
                  <SelectItem value="PARTIAL">
                    Parcialmente, conoce el diagnóstico pero no el pronóstico
                    (no sabe que es incurable o que podría morir)
                  </SelectItem>
                  <SelectItem value="TOTAL">
                    Totalmente, conoce el diagnóstico y el pronóstico
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="religion"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Religión</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                }}
                defaultValue={field.value || undefined}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opción..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="NONE">Ninguna</SelectItem>
                  <SelectItem value="CATHOLIC">Católico</SelectItem>
                  <SelectItem value="JEWISH">Judío</SelectItem>
                  <SelectItem value="EVANGELICAL">Evangelista</SelectItem>
                  <SelectItem value="MORMON">Mormón</SelectItem>
                  <SelectItem value="JEHOVAHS_WITNESS">
                    Testigos de Jehová
                  </SelectItem>
                  <SelectItem value="OTHER">Otro</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="funeralService"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <FormItem>
              <FormLabel className="sr-only">Servicio funerario</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="funeralService"
                    checked={value}
                    onCheckedChange={(checked) => onChange(checked)}
                    onBlur={onBlur}
                    ref={ref}
                  />
                  <label
                    htmlFor="funeralService"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Servicio funerario
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="oncologicalDisease"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <FormItem>
              <FormLabel className="sr-only">Enfermedad oncológica</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="oncologicalDisease"
                    checked={value}
                    onCheckedChange={(checked) => onChange(checked)}
                    onBlur={onBlur}
                    ref={ref}
                  />
                  <label
                    htmlFor="oncologicalDisease"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Enfermedad oncológica
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="tumor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tumor</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tumor"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="metastasis"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <FormItem>
              <FormLabel className="sr-only">Metástasis</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="metastasis"
                    checked={value}
                    onCheckedChange={(checked) => onChange(checked)}
                    onBlur={onBlur}
                    ref={ref}
                  />
                  <label
                    htmlFor="metastasis"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Metástasis
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="metastasisLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lugar de metástasis</FormLabel>
              <FormControl>
                <Input
                  placeholder="Lugar de metástasis"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="personalHistory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Antecedentes personales</FormLabel>
              <FormControl>
                <Input
                  placeholder="Lugar de metástasis"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ecog"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>ECOG</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                }}
                defaultValue={field.value || undefined}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opción..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ZERO">1</SelectItem>
                  <SelectItem value="ONE">2</SelectItem>
                  <SelectItem value="TWO">3</SelectItem>
                  <SelectItem value="THREE">4</SelectItem>
                  <SelectItem value="FOUR">5</SelectItem>
                  <SelectItem value="FIVE">6</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specificOncologicalTreatment"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Tratamiento oncológico específico</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                }}
                defaultValue={field.value || undefined}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opción..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="NONE">Ninguno</SelectItem>
                  <SelectItem value="DEFINITIVE_SUSPENSION">
                    Suspención definitiva
                  </SelectItem>
                  <SelectItem value="NON_CONVENTIONAL">
                    No convencional
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="surgery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cirugía</FormLabel>
              <FormControl>
                <Input
                  placeholder="Cirugía"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="radiotherapy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Radioterapia</FormLabel>
              <FormControl>
                <Input
                  placeholder="Radioterapia"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="chemotherapy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quimioterapia</FormLabel>
              <FormControl>
                <Input
                  placeholder="Quimioterapia"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="hormonetherapy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hormonoterapia</FormLabel>
              <FormControl>
                <Input
                  placeholder="Hormonoterapia"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="opioidTreatment"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <FormItem>
              <FormLabel className="sr-only">Tratamiento opioide</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="opioidTreatment"
                    checked={value}
                    onCheckedChange={(checked) => onChange(checked)}
                    onBlur={onBlur}
                    ref={ref}
                  />
                  <label
                    htmlFor="opioidTreatment"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Tratamiento opioide
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="opioidName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de opioide</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nombre de opioide"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="healthInsuranceNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de obra social</FormLabel>
              <FormControl>
                <Input
                  placeholder="Número de obra social"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="familyComposition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Composición familiar</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Composición familiar"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="familyDoctor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Médico de cabecera</FormLabel>
              <FormControl>
                <Input
                  placeholder="Médico de cabecera"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="complementaryStudies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estudios complementarios</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Estudios complementarios"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Estado</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                }}
                defaultValue={field.value || undefined}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opción..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ALIVE">Vivo</SelectItem>
                  <SelectItem value="PENDING">Pendiente</SelectItem>
                  <SelectItem value="DEAD">Fallecido</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="deathDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de defunción</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Fecha de defunción"
                  value={
                    field.value
                      ? new Date(field.value).toISOString().substring(0, 10)
                      : ""
                  }
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="diseaseId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Id de enfermedad</FormLabel>
              <FormControl>
                <Input
                  placeholder="Id de enfermedad"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="healthInsuranceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Id de seguro social</FormLabel>
              <FormControl>
                <Input
                  placeholder="Id de seguro social"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
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

export default Record;
