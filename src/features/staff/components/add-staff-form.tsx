"use client";

import CustomFormField, { FormFieldType } from "@/components/custom-formfield";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { staffSchema } from "@/features/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ErrorAlert } from "@/components/alerts/error-alert";
import { useNewStaff } from "../api/use-new-staff";
import { SelectItem } from '@/components/ui/select';
import { StaffRole } from '@/constants/appwrite';

type StaffFormValues = z.infer<typeof staffSchema>;

export default function AddStaffForm() {
  const { mutate } = useNewStaff();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState<boolean>(false);

  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      name: "",
      dni: undefined,
      email: "",
      phone_number: "",
      role: "volunteer",
    },
  });

  async function onSubmit(values: StaffFormValues) {
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
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div className="space-y-4">
              <div>
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="name"
                  label="Nombre Completo"
                  placeholder=""
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.NUMBER}
                  name="dni"
                  label="DNI"
                  placeholder=""
                  control={form.control}
                />
              </div>
              <div className="flex items-center space-x-2">
                <CustomFormField
                  fieldType={FormFieldType.EMAIL}
                  name="email"
                  label="Email"
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.PHONE_INPUT}
                  name="phone_number"
                  label="Número de teléfono"
                  placeholder=""
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  name="role"
                  label="Rol"
                  control={form.control}>
                  {StaffRole.map((index, i) => (
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
                ? "Registrando obra social..."
                : "Registrar obra social"}
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
