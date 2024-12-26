"use client";

import CustomFormField, { FormFieldType } from "@/components/custom-formfield";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { staffSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ErrorAlert } from "@/components/alerts/error-alert";
import { SelectItem } from "@/components/ui/select";
import { StaffRole } from "@/constants/appwrite";
import { useUpdateStaff } from "../api/use-update-staff";
import { useParams } from "next/navigation";
import { useFindStaffById } from "../api/use-find-by-id";
import LoadingScreen from "@/components/screens/loading-screen";

type StaffFormValues = z.infer<typeof staffSchema>;

export default function ViewStaffForm() {
  const params = useParams<{ id: string }>();
  const { mutate } = useUpdateStaff();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState<boolean>(false);
  const {
    data: staff,
    isLoading: isLoadingStaff,
    isFetching: isFetchingStaff,
  } = useFindStaffById(params.id);
  const [isResetDone, setIsResetDone] = useState(false);

  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      name: staff?.name,
      dni: staff?.dni,
      email: staff?.email,
      phone_number: staff?.phone_number,
      role: staff?.role,
    },
  });

  useEffect(() => {
    if (staff) {
      console.log("guest", staff);
      form.reset({
        name: staff?.name || "",
        dni: staff?.dni || undefined,
        email: staff?.email,
        phone_number: staff?.phone_number,
        role: staff?.role || "volunteer",
      });
      setIsResetDone(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staff, form]);

  useEffect(() => {
    if (isResetDone) {
      form.setValue("role", staff?.role || "volunteer");
      setIsResetDone(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResetDone, form, staff]);

  async function onSubmit(values: StaffFormValues) {
    setIsSubmitting(true);

    mutate(
      { param: { id: params.id }, json: values },
      {
        onError: () => {
          setShowError(true);
          setIsSubmitting(false);
        },
      }
    );
  }

  if (isLoadingStaff || isFetchingStaff) {
    return <LoadingScreen />;
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
                  defaultValue={form.getValues("name")}
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.NUMBER}
                  name="dni"
                  label="DNI"
                  placeholder=""
                  defaultValue={form.getValues("dni")}
                  control={form.control}
                />
              </div>
              <div className="flex items-center space-x-2">
                <CustomFormField
                  fieldType={FormFieldType.EMAIL}
                  name="email"
                  label="Email"
                  defaultValue={form.getValues("email")}
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.PHONE_INPUT}
                  name="phone_number"
                  label="Número de teléfono"
                  placeholder=""
                  defaultValue={form.getValues("phone_number")}
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
          message="Vuelva a intentarlo. Si el error persiste, póngase en contacto con el soporte técnico."
          onClose={() => setShowError(false)}
        />
      )}
    </>
  );
}
