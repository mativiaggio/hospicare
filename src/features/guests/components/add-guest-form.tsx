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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNewGuest } from "../api/use-new-guest";
import { useGetSocialSecurity } from "@/features/social_security/api/use-get-social-security";
import { CalendarIcon, LoaderCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import ReactDatePicker from "react-datepicker";

type GuestFormValues = z.infer<typeof guestSchema>;

export default function AddGuestForm() {
  const { mutate } = useNewGuest();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBirthdatePopoverOpen, setIsBirthdatePopoverOpen] = useState(false);
  const [isAdmissionPopoverOpen, setIsAdmissionPopoverOpen] = useState(false);
  const router = useRouter();
  const { data: ssResponse, isLoading: isLoadingSocialSecurity } =
    useGetSocialSecurity();

  const form = useForm<GuestFormValues>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      admission_date: new Date(),
      name: "",
      birthdate: new Date(),
      dni: "",
      address: "",
      social_security: "",
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
      // admission_date: new Date(values.admission_date),
      birthdate: new Date(values.birthdate),
    };

    console.log({ formattedValues });
    await mutate({ json: formattedValues });

    router.replace("/huespedes");
  }

  if (isLoadingSocialSecurity) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  // return (
  //   <>
  //     <Form {...form}>
  //       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
  //         <div className="grid grid-cols-3 gap-4">
  //           <Card className="w-full max-w-4xl mx-auto">
  //             <CardHeader>
  //               <CardTitle>Información personal</CardTitle>
  //               <CardDescription>
  //                 Ingrese los datos personales del huésped.
  //               </CardDescription>
  //             </CardHeader>
  //             <CardContent>
  //               <CustomFormField
  //                 fieldType={FormFieldType.INPUT}
  //                 name="name"
  //                 label="Nombre Completo"
  //                 placeholder="John Doe"
  //                 control={form.control}
  //               />
  //               <CustomFormField
  //                 fieldType={FormFieldType.DATE_PICKER}
  //                 name="birthdate"
  //                 label="Fecha de Nacimiento"
  //                 placeholder="Selecciona la fecha de nacimiento"
  //                 iconType="calendar"
  //                 iconAlt="Calendar icon"
  //                 iconLightColor={"#a3a3a3"}
  //                 iconDarkColor={"#a3a3a3"}
  //                 control={form.control}
  //                 fieldCustomClasses={
  //                   "flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 shad-input undefined"
  //                 }
  //               />
  //               <CustomFormField
  //                 fieldType={FormFieldType.DATE_PICKER}
  //                 name="admission_date"
  //                 label="Fecha de Nacimiento"
  //                 placeholder="Selecciona la fecha de nacimiento"
  //                 iconType="calendar"
  //                 iconAlt="Calendar icon"
  //                 iconLightColor={"#a3a3a3"}
  //                 iconDarkColor={"#a3a3a3"}
  //                 control={form.control}
  //                 fieldCustomClasses={
  //                   "flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 shad-input undefined"
  //                 }
  //               />
  //               <CustomFormField
  //                 fieldType={FormFieldType.INPUT}
  //                 name="dni"
  //                 label="DNI"
  //                 placeholder=""
  //                 control={form.control}
  //               />
  //               <CustomFormField
  //                 fieldType={FormFieldType.TEXTAREA}
  //                 name="address"
  //                 label="Dirección"
  //                 placeholder=""
  //                 control={form.control}
  //               />
  //               <CustomFormField
  //                 fieldType={FormFieldType.SELECT}
  //                 name="social_security"
  //                 label="Obra social"
  //                 control={form.control}>
  //                 {ssResponse &&
  //                 ssResponse.social_security?.documents?.length > 0 ? (
  //                   ssResponse.social_security.documents.map((index) => (
  //                     <SelectItem key={index.$id} value={index.$id}>
  //                       <div className="flex cursor-pointer items-center gap-2">
  //                         <p>{index.name}</p>
  //                       </div>
  //                     </SelectItem>
  //                   ))
  //                 ) : (
  //                   <p>No existen obras sociales cargadas</p>
  //                 )}
  //               </CustomFormField>
  //               <CustomFormField
  //                 fieldType={FormFieldType.INPUT}
  //                 name="social_security_number"
  //                 label="Número de afiliado"
  //                 placeholder=""
  //                 control={form.control}
  //               />
  //             </CardContent>
  //           </Card>
  //           <Card className="w-full max-w-4xl mx-auto">
  //             <CardHeader>
  //               <CardTitle>Información de Contacto</CardTitle>
  //               <CardDescription>
  //                 Ingrese los datos de contacto del huésped.
  //               </CardDescription>
  //             </CardHeader>
  //             <CardContent>
  //               <CustomFormField
  //                 fieldType={FormFieldType.INPUT}
  //                 name="contact_name"
  //                 label="Nombre del contacto"
  //                 placeholder=""
  //                 control={form.control}
  //               />
  //               <CustomFormField
  //                 fieldType={FormFieldType.PHONE_INPUT}
  //                 name="contact_phone"
  //                 label="Teléfono"
  //                 placeholder=""
  //                 control={form.control}
  //               />
  //               <CustomFormField
  //                 fieldType={FormFieldType.EMAIL}
  //                 name="contact_email"
  //                 label="Correo del contacto"
  //                 placeholder=""
  //                 control={form.control}
  //               />
  //               <CustomFormField
  //                 fieldType={FormFieldType.TEXTAREA}
  //                 name="relation_with_guest"
  //                 label="Relación con el huésped"
  //                 placeholder=""
  //                 control={form.control}
  //                 inputCustomClasses="h-full"
  //               />
  //             </CardContent>
  //           </Card>
  //           <Card className="w-full max-w-4xl mx-auto">
  //             <CardHeader>
  //               <CardTitle>Información Médica</CardTitle>
  //               <CardDescription>
  //                 ngrese los datos médicos del huésped.
  //               </CardDescription>
  //             </CardHeader>
  //             <CardContent>
  //               <CustomFormField
  //                 fieldType={FormFieldType.INPUT}
  //                 name="referring_person"
  //                 label="Quien lo deriva"
  //                 placeholder=""
  //                 control={form.control}
  //               />
  //               <CustomFormField
  //                 fieldType={FormFieldType.SELECT}
  //                 name="information_level"
  //                 label="Informado"
  //                 control={form.control}>
  //                 {Information_Level.map((index, i) => (
  //                   <SelectItem key={index.id + i} value={index.value}>
  //                     <div className="flex cursor-pointer items-center gap-2">
  //                       <p>{index.name}</p>
  //                     </div>
  //                   </SelectItem>
  //                 ))}
  //               </CustomFormField>
  //               <CustomFormField
  //                 fieldType={FormFieldType.SELECT}
  //                 name="religion"
  //                 label="Religión"
  //                 control={form.control}>
  //                 {Religion.map((index, i) => (
  //                   <SelectItem key={index.id + i} value={index.value}>
  //                     <div className="flex cursor-pointer items-center gap-2">
  //                       <p>{index.name}</p>
  //                     </div>
  //                   </SelectItem>
  //                 ))}
  //               </CustomFormField>
  //               <CustomFormField
  //                 fieldType={FormFieldType.CHECKBOX}
  //                 name="funeral_service"
  //                 label="Servicio funerario"
  //                 description="¿El huésped requiere servicio funerario?"
  //                 control={form.control}
  //               />
  //               <CustomFormField
  //                 fieldType={FormFieldType.INPUT}
  //                 name="tumor"
  //                 label="Tumor"
  //                 placeholder=""
  //                 control={form.control}
  //               />
  //               <CustomFormField
  //                 fieldType={FormFieldType.CHECKBOX}
  //                 name="metastasis"
  //                 label="Metastasis"
  //                 description="¿El huésped presenta metástasis?"
  //                 control={form.control}
  //               />
  //               <CustomFormField
  //                 fieldType={FormFieldType.TEXTAREA}
  //                 name="metastasis_location"
  //                 label="Lugar de metastasis"
  //                 placeholder=""
  //                 control={form.control}
  //               />
  //               <CustomFormField
  //                 fieldType={FormFieldType.TEXTAREA}
  //                 name="personal_history"
  //                 label="Historial personal"
  //                 placeholder=""
  //                 control={form.control}
  //               />
  //               <CustomFormField
  //                 fieldType={FormFieldType.SELECT}
  //                 name="ecog"
  //                 label="ECOG"
  //                 control={form.control}>
  //                 {Ecog.map((index, i) => (
  //                   <SelectItem key={index.id + i} value={index.value}>
  //                     <div className="flex cursor-pointer items-center gap-2">
  //                       <p>{index.name}</p>
  //                     </div>
  //                   </SelectItem>
  //                 ))}
  //               </CustomFormField>
  //               <CustomFormField
  //                 fieldType={FormFieldType.SELECT}
  //                 name="specific_oncological_treatment"
  //                 label="Tratamiento oncológico específico"
  //                 control={form.control}>
  //                 {Specific_OT.map((index, i) => (
  //                   <SelectItem key={index.id + i} value={index.value}>
  //                     <div className="flex cursor-pointer items-center gap-2">
  //                       <p>{index.name}</p>
  //                     </div>
  //                   </SelectItem>
  //                 ))}
  //               </CustomFormField>
  //               <CustomFormField
  //                 fieldType={FormFieldType.INPUT}
  //                 name="surgery"
  //                 label="Cirugía"
  //                 placeholder=""
  //                 control={form.control}
  //               />
  //               <CustomFormField
  //                 fieldType={FormFieldType.INPUT}
  //                 name="radiotherapy"
  //                 label="Radioterapia"
  //                 placeholder=""
  //                 control={form.control}
  //               />
  //               <CustomFormField
  //                 fieldType={FormFieldType.INPUT}
  //                 name="chemotherapy"
  //                 label="Quimioterapia"
  //                 placeholder=""
  //                 control={form.control}
  //               />
  //               <CustomFormField
  //                 fieldType={FormFieldType.INPUT}
  //                 name="hemotherapy"
  //                 label="Hemoterapia"
  //                 placeholder=""
  //                 control={form.control}
  //               />
  //               <CustomFormField
  //                 fieldType={FormFieldType.CHECKBOX}
  //                 name="opioid_treatment"
  //                 label="Tratamiento opioide"
  //                 description="¿El huésped recibe tratamiento con opioides?"
  //                 control={form.control}
  //               />
  //               <CustomFormField
  //                 fieldType={FormFieldType.INPUT}
  //                 name="opioid_name"
  //                 label="Medicación opioide"
  //                 placeholder=""
  //                 control={form.control}
  //               />
  //               <CustomFormField
  //                 fieldType={FormFieldType.TEXTAREA}
  //                 name="other_medications"
  //                 label="Otras medicaciones"
  //                 placeholder=""
  //                 control={form.control}
  //               />
  //               <CustomFormField
  //                 fieldType={FormFieldType.SELECT}
  //                 name="status"
  //                 label="Estado"
  //                 control={form.control}>
  //                 {Status.map((index, i) => (
  //                   <SelectItem key={index.id + i} value={index.value}>
  //                     <div className="flex cursor-pointer items-center gap-2">
  //                       <p>{index.name}</p>
  //                     </div>
  //                   </SelectItem>
  //                 ))}
  //               </CustomFormField>
  //             </CardContent>
  //           </Card>
  //         </div>
  //         <Button disabled={isSubmitting}>
  //           {isSubmitting ? "Guardando..." : "Guardar"}
  //         </Button>
  //       </form>
  //     </Form>
  //     {/* </CardContent>
  //   </Card> */}
  //   </>
  // );

  const handleBirthdateChange = (date: Date | undefined) => {
    if (date) {
      form.setValue("birthdate", date);
      console.log("Fecha de nacimiento seleccionada:", date);
      setIsBirthdatePopoverOpen(false);
    }
  };

  const handleAdmissionChange = (date: Date | undefined) => {
    if (date) {
      form.setValue("admission_date", date);
      console.log("Fecha de admisión seleccionada:", date);
      setIsAdmissionPopoverOpen(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Información Personal</h2>
            <div>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="name"
                label="Nombre Completo"
                placeholder="John Doe"
                control={form.control}
              />
            </div>
            <div>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="dni"
                label="DNI"
                placeholder=""
                control={form.control}
              />
            </div>
            <div>
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                name="address"
                label="Dirección"
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
                fieldType={FormFieldType.TEXTAREA}
                name="metastasis_location"
                label="Lugar de metastasis"
                placeholder=""
                control={form.control}
              />
            </div>
            <div>
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                name="metastasis_location"
                label="Lugar de metastasis"
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
              <Label htmlFor="admission_date">Fecha de Admisión</Label>
              <Popover
                open={isAdmissionPopoverOpen}
                onOpenChange={setIsAdmissionPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.watch("admission_date") ? (
                      form.watch("admission_date")?.toLocaleDateString()
                    ) : (
                      <span>Seleccionar fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.getValues("admission_date")}
                    onSelect={handleAdmissionChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
