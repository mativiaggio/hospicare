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
  Mobility,
  MobilityCause,
  Nutrition,
  OralHealth,
  PressureUlcers,
  RespiratorySystem,
  StoolConsistency,
  Swallowing,
  UrinaryFunctions,
  UrineCharacteristics,
  Hygiene,
  BathTransfer,
  Hydration,
  HydrationMethod,
  AbdominalStatus,
  BowelFunction,
} from "@/constants/appwrite";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useGetSocialSecurity } from "@/features/social_security/api/use-get-social-security";
import ReactDatePicker from "react-datepicker";
import { useFindGuestById } from "../api/use-find-by-id";
import { useUpdateGuest } from "../api/use-update-guest";
import { Label } from "@/components/ui/label";
import { ErrorAlert } from "@/components/alerts/error-alert";
import { guestSchema } from "../schemas";
import LoadingScreen from "@/components/screens/loading-screen";

type GuestFormValues = z.infer<typeof guestSchema>;

export default function ViewGuestForm() {
  const params = useParams<{ id: string }>();
  const { mutate } = useUpdateGuest();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetDone, setIsResetDone] = useState(false);
  const [showError, setShowError] = useState<boolean>(false);
  const { data: ssResponse, isLoading: isLoadingSocialSecurity } =
    useGetSocialSecurity();
  const {
    data: guest,
    isLoading: isLoadingGuest,
    isFetching: isFetchingGuest,
  } = useFindGuestById(params.id);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [provinces, setProvinces] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [municipios, setMunicipios] = useState<any>(null);

  const validInformationLevels = ["total", "partial", "none"];
  const ecogOptions = ["0", "1", "2", "3", "4", "5"];

  const form = useForm<GuestFormValues>({
    resolver: zodResolver(guestSchema),
  });

  useEffect(() => {
    if (guest) {
      form.reset({
        admission_date: guest.admission_date
          ? new Date(guest.admission_date)
          : undefined,
        birthdate: guest.birthdate ? new Date(guest.birthdate) : undefined,
        name: guest.name,
        lastname: guest.lastname,
        dni: guest.dni,
        street_name: guest.street_name,
        street_number: guest.street_number,
        province: guest.province,
        city: guest.city,
        zip_code: guest.zip_code,
        social_security: guest.social_security?.$id,
        social_security_number: guest.social_security_number,
        contact_name: guest.contact_name,
        contact_email: guest.contact_email,
        contact_phone: guest.contact_phone,
        relation_with_guest: guest.relation_with_guest,
        referring_person: guest.referring_person,
        information_level: guest.information_level,
        religion: guest.religion,
        funeral_service: guest.funeral_service,
        tumor: guest.tumor,
        metastasis: guest.metastasis,
        metastasis_location: guest.metastasis_location,
        personal_history: guest.personal_history,
        ecog: guest.ecog,
        specific_oncological_treatment: guest.specific_oncological_treatment,
        surgery: guest.surgery,
        radiotherapy: guest.radiotherapy,
        chemotherapy: guest.chemotherapy,
        hemotherapy: guest.hemotherapy,
        opioid_treatment: guest.opioid_treatment,
        opioid_name: guest.opioid_name,
        other_medications: guest.other_medications,
        fluctuating_course: guest.fluctuating_course,
        attention_disturbance: guest.attention_disturbance,
        disorganized_thinking: guest.disorganized_thinking,
        altered_consciousness_level: guest.altered_consciousness_level,
        heart_rate: guest?.heart_rate,
        blood_pressure_systolic: guest.blood_pressure_systolic,
        blood_pressure_diastolic: guest.blood_pressure_diastolic,
        respiratory_rate: guest.respiratory_rate,
        temperature: guest.temperature,
        pain: guest.pain,
        tiredness: guest.tiredness,
        nausea: guest.nausea,
        depression: guest.depression,
        anxiety: guest.anxiety,
        sleepiness: guest.sleepiness,
        appetite: guest.appetite,
        dyspnoea: guest.dyspnoea,
        difficulty_sleeping: guest.difficulty_sleeping,
        well_being: guest.well_being,
        mobility: guest.mobility,
        mobility_cause: guest.mobility_cause,
        hygiene: guest.hygiene,
        bath_transfer: guest.bath_transfer,
        oral_health: guest.oral_health,
        swallowing: guest.swallowing,
        nutrition: guest.nutrition,
        hydration: guest.hydration,
        hydration_method: guest.hydration_method,
        abdominal_status: guest.abdominal_status,
        urinary_functions: guest.urinary_functions,
        urine_characteristics: guest.urine_characteristics,
        bowel_function: guest.bowel_function,
        stool_consistency: guest.stool_consistency,
        respiratory_system: guest.respiratory_system,
        sputum_type: guest.sputum_type,
        pressure_ulcers: guest.pressure_ulcers,
        pressure_ulcers_location: guest.pressure_ulcers_location,
        skin_lesions: guest.skin_lesions,
        edema: guest.edema,
        edema_location: guest.edema_location,
        ostomies: guest.ostomies,
        ostomy_type: guest.ostomy_type,
        other_disorders: guest.other_disorders,
        care_plan: guest.care_plan,
        status: guest.status,
        hospitalization_date: guest.hospitalization_date
          ? new Date(guest.hospitalization_date)
          : undefined,
      });
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
          ? (guest?.ecog as "0" | "1" | "2" | "3" | "4" | "5")
          : "0"
      );
      form.setValue(
        "specific_oncological_treatment",
        guest?.specific_oncological_treatment || "none"
      );

      form.setValue("well_being", guest?.well_being || 0);
      form.setValue("mobility", guest?.mobility || "normal");
      form.setValue(
        "mobility_cause",
        guest?.mobility_cause || "disease_progression"
      );
      form.setValue("hygiene", guest?.hygiene || "independent");
      form.setValue("bath_transfer", guest?.bath_transfer || "yes");
      form.setValue("oral_health", guest?.oral_health || "healthy");
      form.setValue("swallowing", guest?.swallowing || "normal");
      form.setValue("nutrition", guest?.nutrition || "eats_alone");
      form.setValue("hydration", guest?.hydration || "normal");
      form.setValue("hydration_method", guest?.hydration_method || "oral");
      form.setValue("abdominal_status", guest?.abdominal_status || "normal");
      form.setValue("urinary_functions", guest?.urinary_functions || "normal");
      form.setValue(
        "urine_characteristics",
        guest?.urine_characteristics || "hematuric"
      );
      form.setValue("bowel_function", guest?.bowel_function || "normal");
      form.setValue("stool_consistency", guest?.stool_consistency || "normal");
      form.setValue(
        "respiratory_system",
        guest?.respiratory_system || "normal"
      );
      form.setValue("pressure_ulcers", guest?.pressure_ulcers || "none");
      form.setValue("religion", guest?.religion || "none");
      form.setValue("social_security", guest?.social_security?.$id || "");
      form.setValue("status", guest?.status || "alive");

      form.setValue("province", guest?.province || "");
      form.setValue("city", guest?.city || "");
      fetch(
        `https://apis.datos.gob.ar/georef/api/municipios?provincia=${guest?.province}&max=1000`
      )
        .then((response) => response.json())
        .then((data) => setMunicipios(data));

      setIsResetDone(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResetDone, form, guest]);

  useEffect(() => {
    fetch("https://apis.datos.gob.ar/georef/api/provincias")
      .then((response) => response.json())
      .then((data) => setProvinces(data));
  }, []);

  function handleMunicipios(value: string) {
    fetch(
      `https://apis.datos.gob.ar/georef/api/municipios?provincia=${value}&max=1000`
    )
      .then((response) => response.json())
      .then((data) => setMunicipios(data));
  }

  async function onSubmit(values: GuestFormValues) {
    setIsSubmitting(true);

    const formattedValues = {
      ...values,
      birthdate: new Date(values.birthdate),
    };

    mutate(
      { param: { id: params.id }, json: formattedValues },
      {
        onError: () => {
          setShowError(true);
          setIsSubmitting(false);
        },
      }
    );
  }

  if (isLoadingSocialSecurity || isLoadingGuest || isFetchingGuest) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
          className="">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Información Personal</h2>
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
                  fieldType={FormFieldType.INPUT}
                  name="name"
                  label="Nombres"
                  placeholder=""
                  control={form.control}
                  defaultValue={form.getValues("name")}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="lastname"
                  label="Apellidos"
                  placeholder=""
                  control={form.control}
                  defaultValue={form.getValues("lastname")}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.NUMBER}
                  name="dni"
                  label="DNI (sin puntos)"
                  placeholder=""
                  defaultValue={form.getValues("dni")}
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  name="street_name"
                  label="Calle"
                  placeholder=""
                  defaultValue={form.getValues("street_name")}
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.NUMBER}
                  name="street_number"
                  label="Número"
                  placeholder=""
                  defaultValue={form.getValues("street_number")}
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  name="province"
                  label="Provincia"
                  control={form.control}
                  onValueChange={(value) => handleMunicipios(value)}>
                  {provinces && provinces.provincias.length > 0 ? (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    provinces.provincias.map((index: any) => (
                      <SelectItem key={index.id} value={index.id}>
                        <div className="flex cursor-pointer items-center gap-2">
                          <p>{index.nombre}</p>
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    <p>No se encontraron provincias</p>
                  )}
                </CustomFormField>
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  name="city"
                  label="Municipio"
                  control={form.control}>
                  {municipios && municipios.municipios?.length > 0 ? (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    municipios.municipios.map((index: any) => (
                      <SelectItem key={index.id} value={index.id}>
                        <div className="flex cursor-pointer items-center gap-2">
                          <p>{index.nombre}</p>
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    <p>No se encontraron municipios</p>
                  )}
                </CustomFormField>
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.NUMBER}
                  name="zip_code"
                  label="Código Postal"
                  placeholder=""
                  defaultValue={form.getValues("zip_code")}
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
                  label="Metástasis"
                  description="¿El huésped presenta metástasis?"
                  defaultValue={form.getValues("metastasis")}
                  control={form.control}
                />
              </div>
              <div className="flex items-center space-x-2">
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  name="metastasis_location"
                  label="Lugar de metástasis"
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
                  htmlFor="hospitalization_date">
                  Fecha de internación
                </label>
                <ReactDatePicker
                  selected={form.watch("hospitalization_date")}
                  onChange={(date) =>
                    form.setValue("hospitalization_date", date || new Date())
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
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Evaluación cognitiva</h2>
              <div className="flex items-center space-x-2">
                <CustomFormField
                  fieldType={FormFieldType.CHECKBOX}
                  name="fluctuating_course"
                  label="Comienzo agudo y curso fluctuante"
                  description="¿Ha observado un cambio agudo en el estado mental del paciente?"
                  defaultValue={form.getValues("fluctuating_course")}
                  control={form.control}
                />
              </div>
              <div className="flex items-center space-x-2">
                <CustomFormField
                  fieldType={FormFieldType.CHECKBOX}
                  name="attention_disturbance"
                  label="Alteración de la atención"
                  description="El paciente ¿se distrae con facilidad y/o tiene dificultad para seguir una conversación?"
                  defaultValue={form.getValues("attention_disturbance")}
                  control={form.control}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CustomFormField
                  fieldType={FormFieldType.CHECKBOX}
                  name="disorganized_thinking"
                  label="Pensamiento desorganizado"
                  description="¿El paciente manifiesta ideas o conversaciones incoherentes o confunde a las personas que le rodean?"
                  defaultValue={form.getValues("disorganized_thinking")}
                  control={form.control}
                />
              </div>
              <div className="flex items-center space-x-2">
                <CustomFormField
                  fieldType={FormFieldType.CHECKBOX}
                  name="altered_consciousness_level"
                  label="Alteración del nivel de conciencia"
                  description="¿Está alterado el nivel de conciencia del paciente?"
                  defaultValue={form.getValues("altered_consciousness_level")}
                  control={form.control}
                />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Evaluación física</h2>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.NUMBER}
                  name="heart_rate"
                  label="Frecuencia cardíaca (BPM)"
                  control={form.control}
                />
              </div>
              <Label>Tensión arterial</Label>
              <div className="flex gap-2">
                <CustomFormField
                  fieldType={FormFieldType.NUMBER}
                  name="blood_pressure_systolic"
                  label="Sistólica (mmHg)"
                  placeholder="120"
                  control={form.control}
                />
                <CustomFormField
                  fieldType={FormFieldType.NUMBER}
                  name="blood_pressure_diastolic"
                  label="Diastólica (mmHg)"
                  placeholder="80"
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.NUMBER}
                  name="respiratory_rate"
                  label="Frecuencia respiratoria (rpm)"
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.NUMBER}
                  name="temperature"
                  label="Temperatura"
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.SLIDER}
                  name="pain"
                  label="Dolor"
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.SLIDER}
                  name="tiredness"
                  label="Cansancio"
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.SLIDER}
                  name="nausea"
                  label="Nauseas"
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.SLIDER}
                  name="depression"
                  label="Depresión"
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.SLIDER}
                  name="anxiety"
                  label="Ansiedad"
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.SLIDER}
                  name="sleepiness"
                  label="Somnolencia"
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.SLIDER}
                  name="appetite"
                  label="Apetito"
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.SLIDER}
                  name="dyspnoea"
                  label="Disnea"
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.SLIDER}
                  name="difficulty_sleeping"
                  label="Dificultad para dormir"
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.SLIDER}
                  name="well_being"
                  label="Bienestar"
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  name="mobility"
                  label="Deambulación"
                  control={form.control}>
                  {Mobility.map((index, i) => (
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
                  name="mobility_cause"
                  label="causa"
                  control={form.control}>
                  {MobilityCause.map((index, i) => (
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
                  name="hygiene"
                  label="Higiene y arreglo personal"
                  control={form.control}>
                  {Hygiene.map((index, i) => (
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
                  name="bath_transfer"
                  label="Se traslada al baño"
                  control={form.control}>
                  {BathTransfer.map((index, i) => (
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
                  name="oral_health"
                  label="Boca"
                  control={form.control}>
                  {OralHealth.map((index, i) => (
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
                  name="swallowing"
                  label="Deglusión"
                  control={form.control}>
                  {Swallowing.map((index, i) => (
                    <SelectItem key={index.id + i} value={index.value}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <p>{index.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomFormField>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  name="nutrition"
                  label="Nutrición"
                  control={form.control}>
                  {Nutrition.map((index, i) => (
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
                  name="hydration"
                  label="Hidratación"
                  control={form.control}>
                  {Hydration.map((index, i) => (
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
                  name="hydration_method"
                  label="Forma de hidratación"
                  control={form.control}>
                  {HydrationMethod.map((index, i) => (
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
                  name="abdominal_status"
                  label="Abdomen"
                  control={form.control}>
                  {AbdominalStatus.map((index, i) => (
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
                  name="urinary_functions"
                  label="Diuresis"
                  control={form.control}>
                  {UrinaryFunctions.map((index, i) => (
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
                  name="urine_characteristics"
                  label="Orinas"
                  control={form.control}>
                  {UrineCharacteristics.map((index, i) => (
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
                  name="bowel_function"
                  label="Catarsis"
                  control={form.control}>
                  {BowelFunction.map((index, i) => (
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
                  name="stool_consistency"
                  label="Consistencia"
                  control={form.control}>
                  {StoolConsistency.map((index, i) => (
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
                  name="respiratory_system"
                  label="Aparato respiratorio"
                  control={form.control}>
                  {RespiratorySystem.map((index, i) => (
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
                  name="sputum_type"
                  label="Tipo de expectoración"
                  defaultValue={form.getValues("sputum_type")}
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  name="pressure_ulcers"
                  label="Ulceras por presión"
                  control={form.control}>
                  {PressureUlcers.map((index, i) => (
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
                  name="pressure_ulcers_location"
                  label="Lugar de ulceras por presión"
                  defaultValue={form.getValues("pressure_ulcers_location")}
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="skin_lesions"
                  label="Otras lesiones en piel"
                  defaultValue={form.getValues("skin_lesions")}
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.CHECKBOX}
                  name="edema"
                  label="Edemas"
                  description="Indique si el huésped presenta edemas (hinchazón por acumulación de líquidos)."
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="edema_location"
                  label="Lugar de edemas"
                  defaultValue={form.getValues("edema_location")}
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.CHECKBOX}
                  name="ostomies"
                  label="Ostomías"
                  description="Indique si el huésped posee ostomías (aberturas quirúrgicas para desviar fluidos o desechos)."
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="ostomy_type"
                  label="Tipo de ostomías"
                  defaultValue={form.getValues("ostomy_type")}
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="other_disorders"
                  label="Otros trastornos"
                  defaultValue={form.getValues("other_disorders")}
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  name="care_plan"
                  label="Plan de cuidados"
                  defaultValue={form.getValues("care_plan")}
                  control={form.control}
                />
              </div>
            </div>
          </div>

          <div className="sticky bottom-4 flex justify-end pt-4 pb-[100px] w-fit float-end">
            <Button
              type="submit"
              className="w-full md:w-auto"
              disabled={isSubmitting}>
              {isSubmitting ? "Registrando huésped..." : "Registrar huésped"}
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
