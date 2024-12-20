"use client";

import CustomFormField, { FormFieldType } from "@/components/custom-formfield";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { socialSecuritySchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ErrorAlert } from "@/components/alerts/error-alert";
import { useNewSocialSecurity } from "../api/use-new-social-security";

type SocialSecurityFormValues = z.infer<typeof socialSecuritySchema>;

export default function AddSocialSecurityForm() {
  const { mutate } = useNewSocialSecurity();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState<boolean>(false);

  const form = useForm<SocialSecurityFormValues>({
    resolver: zodResolver(socialSecuritySchema),
    defaultValues: {
      name: "",
      private: false,
    },
  });

  async function onSubmit(values: SocialSecurityFormValues) {
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
              <div className="flex items-center space-x-2">
                <CustomFormField
                  fieldType={FormFieldType.CHECKBOX}
                  name="private"
                  label="Privada"
                  description="¿Es la obra social una prepaga?"
                  control={form.control}
                />
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
