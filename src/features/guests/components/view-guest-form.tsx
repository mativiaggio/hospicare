"use client";

import CustomFormField, { FormFieldType } from "@/components/custom-formfield";
import { Button } from "@/components/ui/button";
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
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNewGuest } from "../api/use-new-guest";
import { useGetSocialSecurity } from "@/features/social_security/api/use-get-social-security";
import { LoaderCircle } from "lucide-react";
import ReactDatePicker from "react-datepicker";
import { useFindGuestById } from "../api/use-find-by-id";

type GuestFormValues = z.infer<typeof guestSchema>;

export default function ViewGuestForm() {
  const params = useParams<{ id: string }>();
  const { mutate } = useNewGuest();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetDone, setIsResetDone] = useState(false);
  const router = useRouter();
  const { data: ssResponse, isLoading: isLoadingSocialSecurity } =
    useGetSocialSecurity();
  const {
    data: guest,
    isLoading: isLoadingGuest,
    isFetching: isFetchingGuest,
  } = useFindGuestById(params.id);
  const validInformationLevels = ["total", "partial", "none"];
  const ecogOptions = ["0", "1", "2", "3", "4"];

  const form = useForm<GuestFormValues>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      admission_date: guest?.admission_date
        ? new Date(guest?.admission_date)
        : undefined,
      birthdate: guest?.birthdate ? new Date(guest?.birthdate) : undefined,
      name: guest?.name || "",
      dni: guest?.dni || "",
      address: guest?.address || "",
      social_security: guest?.social_security?.$id || "",
      social_security_number: guest?.social_security_number || "",
      contact_name: guest?.contact_name || "",
      contact_email: guest?.contact_email || "",
      contact_phone: guest?.contact_phone || "",
      relation_with_guest: guest?.relation_with_guest || "",
      referring_person: guest?.referring_person || "",
      information_level: validInformationLevels.includes(
        guest?.information_level || ""
      )
        ? (guest?.information_level as "total" | "partial" | "none")
        : "total",
      religion: guest?.religion || "none",
      funeral_service: guest?.funeral_service || false,
      tumor: guest?.tumor || "",
      metastasis: guest?.metastasis || false,
      metastasis_location: guest?.metastasis_location || "",
      personal_history: guest?.personal_history || "",
      ecog: ecogOptions.includes(guest?.ecog || "")
        ? (guest?.ecog as "0" | "1" | "2" | "3" | "4")
        : "1",
      specific_oncological_treatment:
        guest?.specific_oncological_treatment || "none",
      surgery: guest?.surgery || "",
      radiotherapy: guest?.radiotherapy || "",
      chemotherapy: guest?.chemotherapy || "",
      hemotherapy: guest?.hemotherapy || "",
      opioid_treatment: guest?.opioid_treatment || false,
      opioid_name: guest?.opioid_name || "",
      other_medications: guest?.other_medications || "",
      status: guest?.status || "alive",
    },
  });

  useEffect(() => {
    if (guest) {
      console.log("guest", guest);
      form.reset({
        admission_date: guest.admission_date
          ? new Date(guest.admission_date)
          : undefined,
        birthdate: guest.birthdate ? new Date(guest.birthdate) : undefined,
        name: guest.name,
        dni: guest.dni,
        address: guest.address,
        social_security: guest.social_security?.$id,
        social_security_number: guest.social_security_number,
        contact_name: guest.contact_name,
        contact_email: guest.contact_email,
        contact_phone: guest.contact_phone,
        relation_with_guest: guest.relation_with_guest,
        referring_person: guest.referring_person,
        information_level: validInformationLevels.includes(
          guest?.information_level || ""
        )
          ? (guest?.information_level as "total" | "partial" | "none")
          : "total",
        religion: guest.religion,
        funeral_service: guest.funeral_service,
        tumor: guest.tumor,
        metastasis: guest.metastasis,
        metastasis_location: guest.metastasis_location,
        personal_history: guest.personal_history,
        ecog: ecogOptions.includes(guest?.ecog || "")
          ? (guest?.ecog as "0" | "1" | "2" | "3" | "4")
          : "1",
        specific_oncological_treatment: guest.specific_oncological_treatment,
        surgery: guest.surgery,
        radiotherapy: guest.radiotherapy,
        chemotherapy: guest.chemotherapy,
        hemotherapy: guest.hemotherapy,
        opioid_treatment: guest.opioid_treatment,
        opioid_name: guest.opioid_name,
        other_medications: guest.other_medications,
        status: guest?.status || "alive",
      });
      console.log("form", form);
      console.log("despues de reset", form.getValues());
      setIsResetDone(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guest, form]);

  useEffect(() => {
    if (isResetDone) {
      form.setValue(
        "information_level",
        validInformationLevels.includes(guest?.information_level || "")
          ? (guest?.information_level as "total" | "partial" | "none")
          : "none"
      );
      form.setValue(
        "ecog",
        ecogOptions.includes(guest?.ecog || "")
          ? (guest?.ecog as "0" | "1" | "2" | "3" | "4")
          : "1"
      );
      form.setValue(
        "specific_oncological_treatment",
        guest?.specific_oncological_treatment
      );
      form.setValue("religion", guest?.religion || "");
      form.setValue("social_security", guest?.social_security?.$id || "");
      form.setValue("status", guest?.status || "");
      setIsResetDone(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResetDone, form, guest]);

  async function onSubmit(values: GuestFormValues) {
    setIsSubmitting(true);

    const formattedValues = {
      ...values,
      birthdate: new Date(values.birthdate),
    };

    console.log({ formattedValues });
    await mutate({ json: formattedValues });

    router.replace("/huespedes");
  }

  if (isLoadingSocialSecurity || isLoadingGuest || isFetchingGuest) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin" size={48} />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        className="space-y-8 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Información Personal</h2>
            <div>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="name"
                label="Nombre Completo"
                placeholder=""
                control={form.control}
                defaultValue={form.getValues("name")}
              />
            </div>
            <div>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="dni"
                label="DNI"
                placeholder=""
                defaultValue={form.getValues("dni")}
                control={form.control}
              />
            </div>
            <div>
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                name="address"
                label="Dirección"
                placeholder=""
                defaultValue={form.getValues("address")}
                control={form.control}
              />
            </div>
            <div>
              <label
                className="block mb-2 font-medium text-sm"
                htmlFor="birthdate">
                Fecha de Nacimiento
              </label>
              <ReactDatePicker
                selected={form.watch("birthdate")}
                onChange={(date) =>
                  form.setValue("birthdate", date || new Date())
                }
                dateFormat="dd/MM/yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                name="social_security"
                label="Obra social"
                control={form.control}>
                {ssResponse &&
                ssResponse.social_security?.documents?.length > 0 ? (
                  ssResponse.social_security.documents.map((index) => (
                    <SelectItem key={index.$id} value={index.$id}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <p>{index.name}</p>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <p>No existen obras sociales cargadas</p>
                )}
              </CustomFormField>
            </div>
            <div>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="social_security_number"
                label="Número de afiliado"
                placeholder=""
                defaultValue={form.getValues("social_security_number")}
                control={form.control}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Información de Contacto</h2>
            <div>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="contact_name"
                label="Nombre de contacto"
                placeholder=""
                defaultValue={form.getValues("contact_name")}
                control={form.control}
              />
            </div>
            <div>
              <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                name="contact_phone"
                label="Teléfono"
                placeholder=""
                defaultValue={form.getValues("contact_phone")}
                control={form.control}
              />
            </div>
            <div>
              <CustomFormField
                fieldType={FormFieldType.EMAIL}
                name="contact_email"
                label="Correo del contacto"
                placeholder=""
                defaultValue={form.getValues("contact_email")}
                control={form.control}
              />
            </div>
            <div>
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                name="relation_with_guest"
                label="Relación con el huésped"
                placeholder=""
                defaultValue={form.getValues("relation_with_guest")}
                control={form.control}
                inputCustomClasses="h-full"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Información Médica</h2>
            <div>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="referring_person"
                label="Quien lo deriva"
                placeholder=""
                defaultValue={form.getValues("referring_person")}
                control={form.control}
              />
            </div>
            <div>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="tumor"
                label="Tumor"
                placeholder=""
                defaultValue={form.getValues("tumor")}
                control={form.control}
              />
            </div>
            <div className="flex items-center space-x-2">
              <CustomFormField
                fieldType={FormFieldType.CHECKBOX}
                name="metastasis"
                label="Metastasis"
                description="¿El huésped recibe tratamiento con opioides?"
                defaultValue={form.getValues("metastasis")}
                control={form.control}
              />
            </div>
            <div className="flex items-center space-x-2">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                name="metastasis_location"
                label="Lugar de metastasis"
                placeholder=""
                defaultValue={form.getValues("metastasis_location")}
                control={form.control}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Tratamiento</h2>
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="surgery"
                label="Cirugía"
                placeholder=""
                defaultValue={form.getValues("surgery")}
                control={form.control}
              />
            </div>
            <div>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="radiotherapy"
                label="Radioterapia"
                placeholder=""
                defaultValue={form.getValues("radiotherapy")}
                control={form.control}
              />
            </div>
            <div>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="chemotherapy"
                label="Quimioterapia"
                placeholder=""
                defaultValue={form.getValues("chemotherapy")}
                control={form.control}
              />
            </div>
            <div>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="hemotherapy"
                label="Hemoterapia"
                placeholder=""
                defaultValue={form.getValues("hemotherapy")}
                control={form.control}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Medicación</h2>
            <div className="flex items-center space-x-2">
              <CustomFormField
                fieldType={FormFieldType.CHECKBOX}
                name="opioid_treatment"
                label="Tratamiento opioide"
                description="¿El huésped recibe tratamiento con opioides?"
                defaultValue={form.getValues("opioid_treatment")}
                control={form.control}
              />
            </div>
            <div>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="opioid_name"
                label="Medicación opioide"
                placeholder=""
                defaultValue={form.getValues("opioid_name")}
                control={form.control}
              />
            </div>
            <div>
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                name="other_medications"
                label="Otras medicaciones"
                placeholder=""
                defaultValue={form.getValues("other_medications")}
                control={form.control}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Información Adicional</h2>
            <div>
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
            </div>
            <div>
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
            </div>
            <div className="flex items-center space-x-2">
              <CustomFormField
                fieldType={FormFieldType.CHECKBOX}
                name="funeral_service"
                label="Servicio funerario"
                description="¿El huésped requiere servicio funerario?"
                defaultValue={form.getValues("funeral_service")}
                control={form.control}
              />
            </div>
            <div>
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                name="personal_history"
                label="Historial personal"
                placeholder=""
                defaultValue={form.getValues("personal_history")}
                control={form.control}
              />
            </div>
            <div>
              <label
                className="block mb-2 font-medium text-sm"
                htmlFor="admission_date">
                Fecha de admisión
              </label>
              <ReactDatePicker
                selected={form.watch("admission_date")}
                onChange={(date) =>
                  form.setValue("admission_date", date || new Date())
                }
                dateFormat="dd/MM/yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
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
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-full md:w-auto"
            disabled={isSubmitting}>
            {isSubmitting ? "Registrando Huésped..." : "Registrar Huésped"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
