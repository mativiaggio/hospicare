"use client";
import A4Sheet from "@/components/prints/A4/a4-sheet";
import { Button } from "@/components/ui/button";
import { useFindGuestById } from "@/features/guests/api/use-find-by-id";
import { calcularEdad, dateFormat } from "@/lib/utils";
import { LoaderCircle, Printer } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFindEpicrisisByGuestId } from "../api/use-find-by-guest-id";
import { useNewEpicrisis } from "../api/use-new-epicrisis";
import { Form } from "@/components/ui/form";
import { ErrorAlert } from "@/components/alerts/error-alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { epicrisisSchema } from "@/features/schemas";
import { z } from "zod";
import CustomFormField, { FormFieldType } from "@/components/custom-formfield";
import { SelectItem } from "@/components/ui/select";
import {
  HospitalizationReason,
  HydrationMethod,
  Information_Level,
  NoYes,
  PreviousPsychopathologicalHistory,
  SpiritualAssistanceType,
  UncontrolledSymptoms,
} from "@/constants/appwrite";
import { useGetStaff } from "@/features/staff/api/use-get-staff";

type EpicrisisFormValues = z.infer<typeof epicrisisSchema>;

function ViewEpicrisisForm() {
  const params = useParams<{ id: string }>();
  const [firstTimeLoad, setFirstTimeLoad] = useState<boolean>(true);

  const {
    data: guest,
    isLoading: isLoadingGuest,
    isFetching: isFetchingGuest,
  } = useFindGuestById(params.id);

  const {
    data: epicrisis,
    isLoading: isLoadingEpicrisis,
    isFetching: isFetchingEpicrisis,
  } = useFindEpicrisisByGuestId(params.id);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: staffResponse, isLoading: isLoadingStaff } = useGetStaff();

  const { mutate } = useNewEpicrisis();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [isResetDone, setIsResetDone] = useState(false);

  const handleClick = () => {
    window.print();
  };

  const form = useForm<EpicrisisFormValues>({
    resolver: zodResolver(epicrisisSchema),
    // defaultValues: {
    //   guest_id: epicrisis?.documents[0].guest_id || "",
    //   medical_emergency: epicrisis?.documents[0].medical_emergency || "no",
    //   home_hospitalization:
    //     epicrisis?.documents[0].home_hospitalization || "no",
    //   home_nursing: epicrisis?.documents[0].home_nursing || "no",
    //   home_nursing_frequency:
    //     epicrisis?.documents[0].home_nursing_frequency || "",
    //   home_doctor: epicrisis?.documents[0].home_doctor || "no",
    //   home_doctor_frequency:
    //     epicrisis?.documents[0].home_doctor_frequency || "",
    //   palliative_care_assistance:
    //     epicrisis?.documents[0].palliative_care_assistance || "no",
    //   hospitalization_reason:
    //     epicrisis?.documents[0].hospitalization_reason || "no_caregivers",
    //   uncontrolled_symptoms:
    //     epicrisis?.documents[0].uncontrolled_symptoms || null,
    //   other_uncontrolled_symptoms:
    //     epicrisis?.documents[0].other_uncontrolled_symptoms || "",
    //   interconsultations: epicrisis?.documents[0].interconsultations || "no",
    //   interconsultation_specialist:
    //     epicrisis?.documents[0].interconsultation_specialist || "",
    //   opioid_demo: epicrisis?.documents[0].opioid_demo || "",
    //   opioid_method: epicrisis?.documents[0].opioid_method || "oral",
    //   sedation: epicrisis?.documents[0].sedation || "no",
    //   sedation_medication: epicrisis?.documents[0].sedation_medication || "",
    //   delirium: epicrisis?.documents[0].delirium || "no",
    //   dyspnoea: epicrisis?.documents[0].dyspnoea || "no",
    //   pain: epicrisis?.documents[0].pain || "no",
    //   suffering: epicrisis?.documents[0].suffering || "no",
    //   family_care: epicrisis?.documents[0].family_care || "no",
    //   family_meeting: epicrisis?.documents[0].family_meeting || "no",
    //   meeting_medic: epicrisis?.documents[0].meeting_medic || "no",
    //   meeting_psychologist:
    //     epicrisis?.documents[0].meeting_psychologist || "no",
    //   meeting_social_worker:
    //     epicrisis?.documents[0].meeting_social_worker || "no",
    //   meeting_nurse: epicrisis?.documents[0].meeting_nurse || "no",
    //   meeting_other: epicrisis?.documents[0].meeting_other || "",
    //   multifamily_meetings:
    //     epicrisis?.documents[0].multifamily_meetings || "no",
    //   spiritual_assistance:
    //     epicrisis?.documents[0].spiritual_assistance || "no",
    //   spiritual_assistance_type:
    //     epicrisis?.documents[0].spiritual_assistance_type || null,
    //   psychological_assistance:
    //     epicrisis?.documents[0].psychological_assistance || "no",
    //   previous_psychopathological_history:
    //     epicrisis?.documents[0].previous_psychopathological_history || "no",
    //   adaptation_difficulties:
    //     epicrisis?.documents[0].adaptation_difficulties || "no",
    //   comments: epicrisis?.documents[0].comments || "",
    //   medic_in_charge: epicrisis?.documents[0].medic_in_charge?.$id || "",
    //   psychologist_in_charge:
    //     epicrisis?.documents[0].psychologist_in_charge?.$id || "",
    //   communication: epicrisis?.documents[0].communication || "",
    // },
  });

  useEffect(() => {
    if (epicrisis) {
      if (epicrisis.documents.length === 0) {
        const values = { guest_id: params.id };
        mutate(
          { json: values },
          {
            onSuccess: () => {
              window.location.reload();
            },
          }
        );
      } else {
        setFirstTimeLoad(false);
        form.reset({
          guest_id: epicrisis?.documents[0].guest_id || "",
          medical_emergency: epicrisis?.documents[0].medical_emergency || "no",
          home_hospitalization:
            epicrisis?.documents[0].home_hospitalization || "no",
          home_nursing: epicrisis?.documents[0].home_nursing || "no",
          home_doctor: epicrisis?.documents[0].home_doctor || "no",
          home_doctor_frequency:
            epicrisis?.documents[0].home_doctor_frequency || "",
          palliative_care_assistance:
            epicrisis?.documents[0].palliative_care_assistance || "no",
          hospitalization_reason:
            epicrisis?.documents[0].hospitalization_reason || "no_caregivers",
          uncontrolled_symptoms:
            epicrisis?.documents[0].uncontrolled_symptoms || null,
          other_uncontrolled_symptoms:
            epicrisis?.documents[0].other_uncontrolled_symptoms || "",
          interconsultations:
            epicrisis?.documents[0].interconsultations || "no",
          interconsultation_specialist:
            epicrisis?.documents[0].interconsultation_specialist || "",
          opioid_demo: epicrisis?.documents[0].opioid_demo || "",
          opioid_method: epicrisis?.documents[0].opioid_method || "oral",
          sedation: epicrisis?.documents[0].sedation || "no",
          sedation_medication:
            epicrisis?.documents[0].sedation_medication || "",
          delirium: epicrisis?.documents[0].delirium || "no",
          dyspnoea: epicrisis?.documents[0].dyspnoea || "no",
          pain: epicrisis?.documents[0].pain || "no",
          suffering: epicrisis?.documents[0].suffering || "no",
          family_care: epicrisis?.documents[0].family_care || "no",
          family_meeting: epicrisis?.documents[0].family_meeting || "no",
          meeting_medic: epicrisis?.documents[0].meeting_medic || "no",
          meeting_psychologist:
            epicrisis?.documents[0].meeting_psychologist || "no",
          meeting_social_worker:
            epicrisis?.documents[0].meeting_social_worker || "no",
          meeting_nurse: epicrisis?.documents[0].meeting_nurse || "no",
          meeting_other: epicrisis?.documents[0].meeting_other || "",
          multifamily_meetings:
            epicrisis?.documents[0].multifamily_meetings || "no",
          spiritual_assistance:
            epicrisis?.documents[0].spiritual_assistance || "no",
          spiritual_assistance_type:
            epicrisis?.documents[0].spiritual_assistance_type || null,
          psychological_assistance:
            epicrisis?.documents[0].psychological_assistance || "no",
          previous_psychopathological_history:
            epicrisis?.documents[0].previous_psychopathological_history || "no",
          adaptation_difficulties:
            epicrisis?.documents[0].adaptation_difficulties || "no",
          comments: epicrisis?.documents[0].comments || "",
          medic_in_charge: epicrisis?.documents[0].medic_in_charge?.$id || "",
          psychologist_in_charge:
            epicrisis?.documents[0].psychologist_in_charge?.$id || "",
          communication: epicrisis?.documents[0].communication || "",
        });
        console.log("form", form);
        setIsResetDone(true);
      }
    }
  }, [epicrisis, mutate, params.id, form]);

  useEffect(() => {
    if (isResetDone) {
      setIsResetDone(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResetDone, form, epicrisis]);

  async function onSubmit() {
    setIsSubmitting(true);

    // mutate(
    //   { param: { id: params.id }, json: values },
    //   {
    //     onError: () => {
    //       setShowError(true);
    //       setIsSubmitting(false);
    //     },
    //   }
    // );
  }

  if (
    isLoadingGuest ||
    isFetchingGuest ||
    isLoadingEpicrisis ||
    isFetchingEpicrisis ||
    firstTimeLoad
  ) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin" size={48} />
      </div>
    );
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
          className="">
          <h1 className="text-2xl font-bold print:hidden pt-4 pb-8">
            Epicrisis de {guest?.name}{" "}
            <span className="text-sm text-gray-500 dark:text-gray-400">
              (impresión hoja A4)
            </span>
          </h1>
          <div className="flex flex-col items-center gap-4 bg-[#e0e0e0]">
            <A4Sheet>
              <div className="flex justify-between mb-4">
                <div className="w-1/3">
                  <Image
                    src={"/hospice-madre-teresa-logo.svg"}
                    height={50}
                    width={150}
                    alt="Logo Hospice Madre Teresa"
                  />
                </div>
                <h1 className="w-1/3 text-center font-bold">Epicrisis</h1>
                <div className="w-1/3"></div>
              </div>
              <div className="text-xs flex justify-between pb-2 print:pb-3">
                <span className="flex gap-1">
                  <p>Nombre y apellido:</p>
                  <div className="border-b print:border-none">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      name=""
                      defaultValue={guest?.name}
                      inputCustomClasses="border-none p-0 h-fit text-xs"
                      control={form.control}
                    />
                  </div>
                </span>
                <p>Edad: {calcularEdad(guest?.birthdate)} años</p>
              </div>
              <div className="text-xs flex gap-1 pb-2 print:pb-3">
                <p>Obra social:</p>
                <div className="border-b print:border-none">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    name=""
                    defaultValue={guest?.social_security?.name}
                    inputCustomClasses="border-none p-0 h-fit text-xs"
                    control={form.control}
                  />
                </div>
              </div>
              <div className="text-xs flex gap-1 pb-2 print:pb-3">
                <p>Dirección:</p>
                <div className="border-b print:border-none">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    name=""
                    defaultValue={guest?.address}
                    inputCustomClasses="border-none p-0 h-fit text-xs"
                    control={form.control}
                  />
                </div>
              </div>
              <div className="text-xs flex gap-1 pb-2 print:pb-3">
                <p>Tumor (si el diagnóstico es cáncer):</p>
                <div className="border-b print:border-none">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    name=""
                    defaultValue={guest?.tumor}
                    inputCustomClasses="border-none p-0 h-fit text-xs"
                    control={form.control}
                  />
                </div>
              </div>
              <div className="text-xs flex gap-1 pb-2 print:pb-3">
                <p>Metástasis:</p>
                <div className="border-b print:border-none">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    name=""
                    defaultValue={guest?.metastasis_location}
                    inputCustomClasses="border-none p-0 h-fit text-xs"
                    control={form.control}
                  />
                </div>
              </div>
              <div className="text-xs flex justify-between pb-2 print:pb-3">
                <span className="flex gap-1">
                  <p>Fecha de internación:</p>
                  <div className="border-b print:border-none">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      name=""
                      defaultValue={dateFormat(guest?.hospitalization_date)}
                      inputCustomClasses="border-none p-0 h-fit text-xs"
                      control={form.control}
                    />
                  </div>
                </span>
                <div></div>
                <span className="flex gap-1">
                  <p>Fecha de fallecimiento:</p>
                  <div className="border-b print:border-none">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      name=""
                      defaultValue={"00/00/00"}
                      inputCustomClasses="border-none p-0 h-fit text-xs"
                      control={form.control}
                    />
                  </div>
                </span>
              </div>
              <div className="text-xs flex justify-between pb-2 print:pb-3">
                <span className="flex gap-1">
                  <p>Total de días de internación:</p>
                  <div className="border-b print:border-none">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      name=""
                      defaultValue={"0"}
                      inputCustomClasses="border-none p-0 h-fit text-xs"
                      control={form.control}
                    />
                  </div>
                </span>
              </div>
              <div className="text-xs flex justify-between pb-2 print:pb-3">
                <span className="flex gap-2">
                  <p>Emergencia médica:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="medical_emergency"
                      label=""
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit"
                      fieldCustomClasses="h-fit">
                      {NoYes.map((index, i) => (
                        <SelectItem key={index.id + i} value={index.value}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p>{index.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </span>
              </div>
              <div className="text-xs flex justify-between pb-2 print:pb-3">
                <span className="flex gap-2">
                  <p>Internación domiciliaria:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="home_hospitalization"
                      label=""
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit">
                      {NoYes.map((index, i) => (
                        <SelectItem key={index.id + i} value={index.value}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p>{index.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </span>
              </div>
              <div className="text-xs grid grid-cols-3 pb-2 print:pb-3">
                <span className="flex gap-2">
                  <p>Enfermería en domicilio:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="home_nursing"
                      label=""
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit">
                      {NoYes.map((index, i) => (
                        <SelectItem key={index.id + i} value={index.value}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p>{index.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </span>
                <div></div>
                <span className="flex gap-2">
                  <p>Frecuencia:</p>
                  <div className="border-b print:border-none w-full">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      name="home_nursing_frequency"
                      label=""
                      placeholder=""
                      defaultValue={form.getValues("home_nursing_frequency")}
                      inputCustomClasses="border-none p-0 text-xs h-fit"
                      control={form.control}
                    />
                  </div>
                </span>
              </div>
              <div className="text-xs flex justify-between pb-2 print:pb-3">
                <span className="flex gap-2">
                  <p>Medico en domicilio:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="home_doctor"
                      label=""
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit">
                      {NoYes.map((index, i) => (
                        <SelectItem key={index.id + i} value={index.value}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p>{index.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </span>
                <span className="flex gap-2">
                  <p>Frecuencia:</p>
                  <div className="border-b print:border-none">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      name="home_doctor_frequency"
                      label=""
                      placeholder=""
                      defaultValue={form.getValues("home_doctor_frequency")}
                      inputCustomClasses="border-none p-0 text-xs h-fit"
                      control={form.control}
                    />
                  </div>
                </span>
                <span className="flex gap-2">
                  <p>Para Asist. Final Vida:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="palliative_care_assistance"
                      label=""
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit">
                      {NoYes.map((index, i) => (
                        <SelectItem key={index.id + i} value={index.value}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p>{index.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </span>
              </div>
              <div className="text-xs flex justify-between pb-2 print:pb-3">
                <span className="w-1/2 flex gap-2">
                  <p>Motivo de internación:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="hospitalization_reason"
                      label=""
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit">
                      {HospitalizationReason.map((index, i) => (
                        <SelectItem key={index.id + i} value={index.value}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p>{index.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </span>
                <span className="w-1/2 flex justify-end gap-2">
                  <p>Sintomas no controlados:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="uncontrolled_symptoms"
                      label=""
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit">
                      {UncontrolledSymptoms.map((index, i) => (
                        <SelectItem key={index.id + i} value={index.value}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p>{index.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </span>
              </div>
              <div className="text-xs flex pb-2 print:pb-3">
                <p>Otros:</p>
                <div className="border-b print:border-none w-full">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    name="other_uncontrolled_symptoms"
                    defaultValue={form.getValues("other_uncontrolled_symptoms")}
                    inputCustomClasses="border-none p-0 h-fit text-xs"
                    control={form.control}
                  />
                </div>
              </div>
              <div className="text-xs flex pb-2 print:pb-3">
                <p>Comunicación:</p>
                <div className="border-b print:border-none w-full">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    name="communication"
                    defaultValue={form.getValues("communication")}
                    inputCustomClasses="border-none p-0 h-fit text-xs"
                    control={form.control}
                  />
                </div>
              </div>
              <div className="text-xs flex justify-between pb-2 print:pb-3">
                <p>
                  Conoció el diagnóstico y pronóstico:{" "}
                  {
                    Information_Level.find(
                      (level) => level.value === guest?.information_level
                    )?.name
                  }
                </p>
              </div>
              <div className="text-xs grid grid-cols-3 pb-2 print:pb-3">
                <span className="flex gap-2">
                  <p>Interconsultas realizadas:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="interconsultations"
                      label=""
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit">
                      {NoYes.map((index, i) => (
                        <SelectItem key={index.id + i} value={index.value}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p>{index.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </span>
                <div></div>
                <span className="flex gap-2">
                  <p>Especialista:</p>
                  <div className="border-b print:border-none w-full">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      name="interconsultation_specialist"
                      label=""
                      placeholder=""
                      defaultValue={form.getValues(
                        "interconsultation_specialist"
                      )}
                      inputCustomClasses="border-none p-0 text-xs h-fit"
                      control={form.control}
                    />
                  </div>
                </span>
              </div>
              <div className="text-xs grid grid-cols-3 pb-2 print:pb-3">
                <span className="flex gap-2">
                  <p>
                    Tratamiento opioide: {guest?.opioid_treatment ? "Sí" : "No"}
                  </p>
                </span>
                <div></div>
                <span className="flex gap-1">
                  <p>Hidratación:</p>
                  <div className="border-b print:border-none">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      name=""
                      defaultValue={
                        HydrationMethod.find(
                          (level) => level.value === guest?.hydration_method
                        )?.name
                      }
                      inputCustomClasses="border-none p-0 h-fit text-xs"
                      control={form.control}
                    />
                  </div>
                </span>
              </div>
              <div className="text-xs grid grid-cols-3 pb-2 print:pb-3">
                <span className="flex gap-1">
                  <p>Tipo de opioide:</p>
                  <div className="border-b print:border-none">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      name=""
                      defaultValue={guest?.opioid_name}
                      inputCustomClasses="border-none p-0 h-fit text-xs"
                      control={form.control}
                    />
                  </div>
                </span>
                <span className="flex gap-2">
                  <p>Demo:</p>
                  <div className="border-b print:border-none">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      name="opioid_demo"
                      label=""
                      placeholder=""
                      defaultValue={form.getValues("opioid_demo")}
                      inputCustomClasses="border-none p-0 text-xs h-fit"
                      control={form.control}
                    />
                  </div>
                </span>
                <span className="flex gap-2">
                  <p>Vía:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="opioid_method"
                      label=""
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit">
                      {HydrationMethod.map((index, i) => (
                        <SelectItem key={index.id + i} value={index.value}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p>{index.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </span>
              </div>
              <div className="text-xs grid grid-cols-3 pb-2 print:pb-3">
                <span className="flex gap-2">
                  <p>Sedación:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="sedation"
                      label=""
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit">
                      {NoYes.map((index, i) => (
                        <SelectItem key={index.id + i} value={index.value}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p>{index.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </span>
                <div></div>
                <span className="flex gap-2">
                  <p>Medicación:</p>
                  <div className="border-b print:border-none w-full">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      name="sedation_medication"
                      label=""
                      placeholder=""
                      defaultValue={form.getValues("sedation_medication")}
                      inputCustomClasses="border-none p-0 text-xs h-fit"
                      control={form.control}
                    />
                  </div>
                </span>
              </div>
              <div className="text-xs flex justify-between pb-2 print:pb-3">
                <span className="flex gap-2">
                  <p>Delirio:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="delirium"
                      label=""
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit">
                      {NoYes.map((index, i) => (
                        <SelectItem key={index.id + i} value={index.value}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p>{index.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </span>
                <p>Disnea: {guest?.dyspnoea ?? 0 > 0 ? "Sí" : "No"}</p>
                <p>Dolor: {guest?.pain ?? 0 > 0 ? "Sí" : "No"}</p>
                <span className="flex gap-2">
                  <p>Sufrimiento:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="suffering"
                      label=""
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit">
                      {NoYes.map((index, i) => (
                        <SelectItem key={index.id + i} value={index.value}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p>{index.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </span>
              </div>
              <div className="text-xs flex pb-2 print:pb-3">
                <p className="whitespace-nowrap">Médico a cargo:</p>
                <div className="border-b print:border-none w-full">
                  <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    name="medic_in_charge"
                    control={form.control}
                    inputCustomClasses="border-none p-0 text-xs h-fit">
                    {staffResponse &&
                    staffResponse.staff?.documents?.length > 0 ? (
                      staffResponse.staff.documents
                        .filter((index) => index.role === "doctor")
                        .map((index) => (
                          <SelectItem key={index.$id} value={index.$id}>
                            <div className="flex cursor-pointer items-center gap-2">
                              <p>{index.name}</p>
                            </div>
                          </SelectItem>
                        ))
                    ) : (
                      <p>No existen médicos cargados</p>
                    )}
                  </CustomFormField>
                </div>
              </div>
              <div className="text-xs flex pb-2 print:pb-3">
                <p className="whitespace-nowrap font-bold">Psicosocial:</p>
              </div>
              <div className="text-xs flex justify-between pb-2 print:pb-3">
                <span className="flex gap-2">
                  <p>Cuidado familiar:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="family_care"
                      label=""
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit">
                      {NoYes.map((index, i) => (
                        <SelectItem key={index.id + i} value={index.value}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p>{index.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </span>
              </div>
              <div className="text-xs grid grid-cols-3 pb-2 print:pb-3">
                <span className="flex gap-2">
                  <p>Se realizó reunión familiar:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="family_meeting"
                      label=""
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit">
                      {NoYes.map((index, i) => (
                        <SelectItem key={index.id + i} value={index.value}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p>{index.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </span>
              </div>
              <div className="text-xs grid grid-cols-3 pb-2 print:pb-3">
                <span className="flex gap-2">
                  <p className="font-bold">
                    Profesionales a cargo de la reunión
                  </p>
                </span>
              </div>
              <div className="text-xs flex justify-between pb-2 print:pb-3">
                <span className="flex gap-2">
                  <p>Médico/a:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="meeting_medic"
                      label=""
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit">
                      {NoYes.map((index, i) => (
                        <SelectItem key={index.id + i} value={index.value}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p>{index.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </span>
                <span className="flex gap-2">
                  <p>Psicólogo/a:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="meeting_psychologist"
                      label=""
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit">
                      {NoYes.map((index, i) => (
                        <SelectItem key={index.id + i} value={index.value}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p>{index.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </span>
                <span className="flex gap-2">
                  <p>Trabajador/a social:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="meeting_social_worker"
                      label=""
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit">
                      {NoYes.map((index, i) => (
                        <SelectItem key={index.id + i} value={index.value}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p>{index.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </span>
                <span className="flex gap-2">
                  <p>Enfermero/a:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="meeting_nurse"
                      label=""
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit">
                      {NoYes.map((index, i) => (
                        <SelectItem key={index.id + i} value={index.value}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p>{index.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </span>
              </div>
              <div className="text-xs flex pb-2 print:pb-3">
                <p>Otros:</p>
                <div className="border-b print:border-none w-full">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    name="meeting_other"
                    defaultValue={form.getValues("meeting_other")}
                    inputCustomClasses="border-none p-0 h-fit text-xs"
                    control={form.control}
                  />
                </div>
              </div>
              <div className="text-xs flex justify-between pb-2 print:pb-3">
                <span className="flex gap-2">
                  <p>Participaron en reuniones multifamiliares:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="multifamily_meetings"
                      label=""
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit">
                      {NoYes.map((index, i) => (
                        <SelectItem key={index.id + i} value={index.value}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p>{index.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </span>
              </div>
              <div className="text-xs flex justify-between pb-2 print:pb-3">
                <span className="flex gap-2">
                  <p>Recibió asistencia espiritual:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="spiritual_assistance"
                      label=""
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit">
                      {NoYes.map((index, i) => (
                        <SelectItem key={index.id + i} value={index.value}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p>{index.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </span>
                <span className="flex gap-2">
                  <p>Asistencia espiritual:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="spiritual_assistance_type"
                      label=""
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit">
                      {SpiritualAssistanceType.map((index, i) => (
                        <SelectItem key={index.id + i} value={index.value}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p>{index.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </span>
              </div>
              <div className="text-xs flex justify-between pb-2 print:pb-3">
                <span className="flex gap-2">
                  <p>Recibió asistencia psicológica:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="psychological_assistance"
                      label=""
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit">
                      {NoYes.map((index, i) => (
                        <SelectItem key={index.id + i} value={index.value}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p>{index.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </span>
                <span className="flex gap-2">
                  <p>Psicólogo/a a cargo:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="psychologist_in_charge"
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit">
                      {staffResponse &&
                      staffResponse.staff?.documents?.length > 0 ? (
                        staffResponse.staff.documents
                          .filter((index) => index.role === "psychologist")
                          .map((index) => (
                            <SelectItem key={index.$id} value={index.$id}>
                              <div className="flex cursor-pointer items-center gap-2">
                                <p>{index.name}</p>
                              </div>
                            </SelectItem>
                          ))
                      ) : (
                        <p>No existen psicólogos cargados</p>
                      )}
                    </CustomFormField>
                  </div>
                </span>
              </div>
              <div className="text-xs flex justify-between pb-2 print:pb-3">
                <span className="flex gap-2">
                  <p>Antecedentes psicopatológicos previos:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="previous_psychopathological_history"
                      label=""
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit">
                      {PreviousPsychopathologicalHistory.map((index, i) => (
                        <SelectItem key={index.id + i} value={index.value}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p>{index.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </span>
                <span className="flex gap-2">
                  <p>Tuvo dificultades de adaptación:</p>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      name="adaptation_difficulties"
                      label=""
                      control={form.control}
                      inputCustomClasses="border-none p-0 text-xs h-fit">
                      {NoYes.map((index, i) => (
                        <SelectItem key={index.id + i} value={index.value}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p>{index.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </span>
              </div>
              <div className="text-xs flex gap-2 pb-2 print:pb-3">
                <p>Ansiedad: {guest?.anxiety ?? 0 > 0 ? "Sí" : "No"}</p>
              </div>
              <div className="text-xs flex gap-2 pb-2 print:pb-3">
                <p>Depresión: {guest?.depression ?? 0 > 0 ? "Sí" : "No"}</p>
              </div>
              <div className="text-xs flex pb-2 print:pb-3">
                <p className="whitespace-nowrap font-bold">Comentarios:</p>
              </div>
              <div className="text-xs flex pb-2 print:pb-3">
                <div className="border print:border-none w-full p-2 print:p-0">
                  <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    name="comments"
                    defaultValue={form.getValues("meeting_other")}
                    inputCustomClasses="border-none p-0 h-[80px] text-xs resize-none overflow-hidden"
                    control={form.control}
                  />
                </div>
              </div>
            </A4Sheet>
            <div className="pb-4 print:hidden sticky bottom-4 flex justify-between items-center w-full">
              <div className="w-1/3"></div>
              <div className="w-1/3 flex justify-center">
                <Button
                  onClick={handleClick}
                  variant={"invert"}
                  className="flex items-center justify-center rounded-full !h-12 !w-12 p-0"
                  title="Imprimir">
                  <Printer className="!h-6 !w-6" />
                </Button>
              </div>
              <div className="w-1/3 flex justify-end">
                <Button
                  variant={"invert"}
                  type="submit"
                  className="w-full md:w-auto"
                  disabled={isSubmitting}>
                  {isSubmitting
                    ? "Guardando epicrisis..."
                    : "Guardar epicrisis"}
                </Button>
              </div>
            </div>
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
    </div>
  );
}

export default ViewEpicrisisForm;
