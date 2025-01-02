"use client";

import CustomFormField, { FormFieldType } from "@/components/custom-formfield";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import {
  AbdominalStatus,
  BathTransfer,
  BowelFunction,
  Ecog,
  Hydration,
  HydrationMethod,
  Hygiene,
  Information_Level,
  Mobility,
  MobilityCause,
  Nutrition,
  OralHealth,
  PressureUlcers,
  Religion,
  RespiratorySystem,
  Specific_OT,
  Status,
  StoolConsistency,
  Swallowing,
  UrinaryFunctions,
  UrineCharacteristics,
} from "@/constants/appwrite";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNewGuest } from "../api/use-new-guest";
import { useGetSocialSecurity } from "@/features/social_security/api/use-get-social-security";
import ReactDatePicker from "react-datepicker";
import { Label } from "@/components/ui/label";
import { ErrorAlert } from "@/components/alerts/error-alert";
import { guestSchema } from "../schemas";
import LoadingScreen from "@/components/screens/loading-screen";

type GuestFormValues = z.infer<typeof guestSchema>;

export default function AddGuestForm() {
  const { mutate } = useNewGuest();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState<boolean>(false);
  const { data: ssResponse, isLoading: isLoadingSocialSecurity } =
    useGetSocialSecurity();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [provinces, setProvinces] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [municipios, setMunicipios] = useState<any>(null);

  const form = useForm<GuestFormValues>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      admission_date: new Date(),
      name: "",
      lastname: "",
      birthdate: new Date(),
      dni: undefined,
      street_name: "",
      street_number: undefined,
      province: "",
      city: "",
      zip_code: undefined,
      social_security: "",
      social_security_number: "",
      contact_name: "",
      contact_email: undefined,
      contact_phone: "",
      relation_with_guest: "",
      referring_person: "",
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
      fluctuating_course: false,
      attention_disturbance: false,
      disorganized_thinking: false,
      altered_consciousness_level: false,
      heart_rate: null,
      blood_pressure_systolic: null,
      blood_pressure_diastolic: null,
      respiratory_rate: null,
      temperature: null,
      pain: 0,
      tiredness: 0,
      nausea: 0,
      depression: 0,
      anxiety: 0,
      sleepiness: 0,
      appetite: 0,
      dyspnoea: 0,
      difficulty_sleeping: 0,
      well_being: 0,
      mobility: "normal",
      mobility_cause: "disease_progression",
      hygiene: "independent",
      bath_transfer: "yes",
      oral_health: "healthy",
      swallowing: "normal",
      nutrition: "eats_alone",
      hydration: "normal",
      hydration_method: "oral",
      abdominal_status: "normal",
      urinary_functions: "normal",
      urine_characteristics: "hematuric",
      bowel_function: "normal",
      stool_consistency: "normal",
      respiratory_system: "normal",
      sputum_type: "",
      pressure_ulcers: "none",
      pressure_ulcers_location: "",
      skin_lesions: "",
      edema: false,
      edema_location: "",
      ostomies: false,
      ostomy_type: "",
      other_disorders: "",
      care_plan: "",
      hospitalization_date: null,
    },
  });

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
      admission_date: new Date(values.admission_date),
      birthdate: new Date(values.birthdate),
      hospitalization_date: values.hospitalization_date
        ? new Date(values.hospitalization_date)
        : null,
    };

    mutate(
      { json: formattedValues },
      {
        onError: () => {
          setShowError(true);
          setIsSubmitting(false);
        },
      }
    );
  }

  if (isLoadingSocialSecurity) {
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
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="lastname"
                  label="Apellidos"
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
              <div>
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  name="street_name"
                  label="Calle"
                  placeholder=""
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.NUMBER}
                  name="street_number"
                  label="Número"
                  placeholder=""
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
                  fieldType={FormFieldType.INPUT}
                  name="zip_code"
                  label="Código Postal"
                  placeholder=""
                  control={form.control}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium" htmlFor="birthdate">
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
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.PHONE_INPUT}
                  name="contact_phone"
                  label="Teléfono"
                  placeholder=""
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.EMAIL}
                  name="contact_email"
                  label="Correo del contacto"
                  placeholder=""
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  name="relation_with_guest"
                  label="Relación con el huésped"
                  placeholder=""
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
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="tumor"
                  label="Tumor"
                  placeholder=""
                  control={form.control}
                />
              </div>
              <div className="flex items-center space-x-2">
                <CustomFormField
                  fieldType={FormFieldType.CHECKBOX}
                  name="metastasis"
                  label="Metástasis"
                  description="¿El huésped presenta metástasis?"
                  control={form.control}
                />
              </div>
              <div className="flex items-center space-x-2">
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  name="metastasis_location"
                  label="Lugar de metástasis"
                  placeholder=""
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
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="radiotherapy"
                  label="Radioterapia"
                  placeholder=""
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="chemotherapy"
                  label="Quimioterapia"
                  placeholder=""
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="hemotherapy"
                  label="Hemoterapia"
                  placeholder=""
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
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="opioid_name"
                  label="Medicación opioide"
                  placeholder=""
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  name="other_medications"
                  label="Otras medicaciones"
                  placeholder=""
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
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  name="personal_history"
                  label="Historial personal"
                  placeholder=""
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
                  control={form.control}
                />
              </div>
              <div className="flex items-center space-x-2">
                <CustomFormField
                  fieldType={FormFieldType.CHECKBOX}
                  name="attention_disturbance"
                  label="Alteración de la atención"
                  description="El paciente ¿se distrae con facilidad y/o tiene dificultad para seguir una conversación?"
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
                  control={form.control}
                />
              </div>
              <div className="flex items-center space-x-2">
                <CustomFormField
                  fieldType={FormFieldType.CHECKBOX}
                  name="altered_consciousness_level"
                  label="Alteración del nivel de conciencia"
                  description="¿Está alterado el nivel de conciencia del paciente?"
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
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="skin_lesions"
                  label="Otras lesiones en piel"
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
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="other_disorders"
                  label="Otros trastornos"
                  control={form.control}
                />
              </div>
              <div>
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  name="care_plan"
                  label="Plan de cuidados"
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
