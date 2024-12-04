"use client";

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
import { SelectItem } from "@/components/ui/select";
import {
  Ecog,
  Information_Level,
  Religion,
  Specific_OT,
  Status,
} from "@/constants/appwrite";
import { guestSchema } from "@/features/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNewGuest } from "../api/use-new-guest";

type GuestFormValues = z.infer<typeof guestSchema>;

export default function AddGuestForm() {
  const { mutate } = useNewGuest();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<GuestFormValues>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      admission_date: new Date(),
      name: "",
      birthdate: new Date(),
      dni: "",
      contact_name: "",
      contact_email: "",
      contact_phone: "",
      relation_with_guest: "",
      information_level: "total",
      religion: "none",
      funeral_service: false,
      tumor: "",
      metastasis: false,
      metastasis_location: "",
      personal_history: "",
      ecog: "0",
      specific_oncological_treatment: "none",
      surgery: "",
      radiotherapy: "",
      chemotherapy: "",
      hemotherapy: "",
      opioid_treatment: false,
      opioid_name: "",
      other_medications: "",
      status: "alive",
    },
  });

  async function onSubmit(values: GuestFormValues) {
    setIsSubmitting(true);

    const formattedValues = {
      ...values,
      admission_date: new Date(values.admission_date),
      birthdate: new Date(values.birthdate),
    };

    console.log({ formattedValues });
    await mutate({ json: formattedValues });

    router.replace("/huespedes");
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-4">
            <Card className="w-full max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Información personal</CardTitle>
                <CardDescription>
                  Ingrese los datos personales del huésped.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="name"
                  label="Nombre Completo"
                  placeholder="John Doe"
                  control={form.control}
                />
                <CustomFormField
                  fieldType={FormFieldType.DATE_PICKER}
                  name="birthdate"
                  label="Fecha de Nacimiento"
                  placeholder="Selecciona la fecha de nacimiento"
                  iconType="calendar"
                  iconAlt="Calendar icon"
                  iconLightColor={"#a3a3a3"}
                  iconDarkColor={"#a3a3a3"}
                  control={form.control}
                  fieldCustomClasses={
                    "flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 shad-input undefined"
                  }
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="dni"
                  label="DNI"
                  placeholder=""
                  control={form.control}
                />
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  name="address"
                  label="Dirección"
                  placeholder=""
                  control={form.control}
                />
              </CardContent>
            </Card>
            <Card className="w-full max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
                <CardDescription>
                  Ingrese los datos de contacto del huésped.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="contact_name"
                  label="Nombre del contacto"
                  placeholder=""
                  control={form.control}
                />
                <CustomFormField
                  fieldType={FormFieldType.PHONE_INPUT}
                  name="contact_phone"
                  label="Teléfono"
                  placeholder=""
                  control={form.control}
                />
                <CustomFormField
                  fieldType={FormFieldType.EMAIL}
                  name="contact_email"
                  label="Correo del contacto"
                  placeholder=""
                  control={form.control}
                />
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  name="relation_with_guest"
                  label="Relación con el huésped"
                  placeholder=""
                  control={form.control}
                />
              </CardContent>
            </Card>
            <Card className="w-full max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Información Médica</CardTitle>
                <CardDescription>
                  ngrese los datos médicos del huésped.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="referring_person"
                  label="Quien lo deriva"
                  placeholder=""
                  control={form.control}
                />
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  name="information_level"
                  label="Informado"
                  control={form.control}>
                  {Information_Level.map((index, i) => (
                    <SelectItem key={index.id + i} value={index.value}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <p>{index.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomFormField>
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  name="religion"
                  label="Religión"
                  control={form.control}>
                  {Religion.map((index, i) => (
                    <SelectItem key={index.id + i} value={index.value}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <p>{index.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomFormField>
                <CustomFormField
                  fieldType={FormFieldType.CHECKBOX}
                  name="funeral_service"
                  label="Servicio funerario"
                  description="¿El huésped requiere servicio funerario?"
                  control={form.control}
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="tumor"
                  label="Tumor"
                  placeholder=""
                  control={form.control}
                />
                <CustomFormField
                  fieldType={FormFieldType.CHECKBOX}
                  name="metastasis"
                  label="Metastasis"
                  description="¿El huésped presenta metástasis?"
                  control={form.control}
                />
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  name="metastasis_location"
                  label="Lugar de metastasis"
                  placeholder=""
                  control={form.control}
                />
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  name="personal_history"
                  label="Historial personal"
                  placeholder=""
                  control={form.control}
                />
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  name="ecog"
                  label="ECOG"
                  control={form.control}>
                  {Ecog.map((index, i) => (
                    <SelectItem key={index.id + i} value={index.value}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <p>{index.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomFormField>
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  name="specific_oncological_treatment"
                  label="Tratamiento oncológico específico"
                  control={form.control}>
                  {Specific_OT.map((index, i) => (
                    <SelectItem key={index.id + i} value={index.value}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <p>{index.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomFormField>
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="surgery"
                  label="Cirugía"
                  placeholder=""
                  control={form.control}
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="radiotherapy"
                  label="Radioterapia"
                  placeholder=""
                  control={form.control}
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="chemotherapy"
                  label="Quimioterapia"
                  placeholder=""
                  control={form.control}
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="hemotherapy"
                  label="Hemoterapia"
                  placeholder=""
                  control={form.control}
                />
                <CustomFormField
                  fieldType={FormFieldType.CHECKBOX}
                  name="opioid_treatment"
                  label="Tratamiento opioide"
                  description="¿El huésped recibe tratamiento con opioides?"
                  control={form.control}
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="opioid_name"
                  label="Medicación opioide"
                  placeholder=""
                  control={form.control}
                />
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  name="other_medications"
                  label="Otras medicaciones"
                  placeholder=""
                  control={form.control}
                />
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  name="status"
                  label="Estado"
                  control={form.control}>
                  {Status.map((index, i) => (
                    <SelectItem key={index.id + i} value={index.value}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <p>{index.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomFormField>
              </CardContent>
            </Card>
          </div>
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar"}
          </Button>
        </form>
      </Form>
      {/* </CardContent>
    </Card> */}
    </>
  );
}
