"use client";

import CustomFormField, { FormFieldType } from "@/components/custom-formfield";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { medicationSchema } from "@/features/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ErrorAlert } from "@/components/alerts/error-alert";
import { useNewMedication } from "../api/use-new-medication";
import { SelectItem } from "@/components/ui/select";
import { RouteOfAdministration } from "@/constants/appwrite";

type MedicationFormValues = z.infer<typeof medicationSchema>;

export default function AddMedicationForm() {
  const { mutate } = useNewMedication();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState<boolean>(false);

  const form = useForm<MedicationFormValues>({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      name: "",
      manufacturer: "",
      route_of_administration: "oral",
    },
  });

  async function onSubmit(values: MedicationFormValues) {
    setIsSubmitting(true);

    mutate(
      { json: values },
      {
        onError: () => {
          setShowError(true);
          setIsSubmitting(false);
        },
      }
    );
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
          className="">
          <h1 className="font-bold">Agregar medicamento</h1>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div className="space-y-4">
              <div>
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="name"
                  label="Nombre"
                  placeholder=""
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="manufacturer"
                  label="Laboratorio"
                  placeholder=""
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  name="route_of_administration"
                  label="Modo de administración"
                  control={form.control}>
                  {RouteOfAdministration.map((index, i) => (
                    <SelectItem key={index.id + i} value={index.value}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <p>{index.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomFormField>
              </div>
            </div>
          </div>

          <div className="sticky bottom-4 flex justify-end pt-4">
            <Button
              type="submit"
              className="w-full md:w-auto"
              disabled={isSubmitting}>
              {isSubmitting
                ? "Registrando medicamento..."
                : "Registrar medicamento"}
            </Button>
          </div>
        </form>
      </Form>
      {showError && (
        <ErrorAlert
          title="Ocurrió un error al guardar los datos."
          message="Vuelva a intentar, si el error persiste póngase en contacto con el soporte técnico."
          onClose={() => setShowError(false)}
        />
      )}
    </>
  );
}