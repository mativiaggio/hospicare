"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { v4 } from "uuid";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useRouter } from "next/navigation";

import { useModal } from "@/lib/providers/modal-provider";
import { useToast } from "@/hooks/use-toast";
import { upsertGuest } from "@/database/guest/queries";
import { Guest, SocialSecurity } from "@prisma/client";
import { Submit } from "@/components/buttons/submit";
import { guestSchema } from "@/database/guest/types";
import ReactDatePicker from "react-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-number-input";

const formSchema = guestSchema;

interface GuestFormProps {
  details?: Partial<Guest>;
  socialSecurities: SocialSecurity[];
  userId?: string;
}

const GuestForm: React.FC<GuestFormProps> = ({ details, socialSecurities }) => {
  const { setClose } = useModal();
  const router = useRouter();
  const { toast } = useToast();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [provinces, setProvinces] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [municipios, setMunicipios] = useState<any>(null);

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      admissionDate: details?.admissionDate || new Date(),
      birthdate: details?.birthdate ? new Date(details.birthdate) : new Date(0),
      name: details?.name || "",
      lastname: details?.lastname || "",
      dni: details?.dni || 0,
      streetName: details?.streetName || "",
      streetNumber: details?.streetNumber || null,
      province: details?.province || "",
      city: details?.city || "",
      zipCode: details?.zipCode || null,
      socialSecurityId: details?.socialSecurityId || null,
      socialSecurityNumber: details?.socialSecurityNumber || "",
      contactName: details?.contactName || "",
      contactEmail: details?.contactEmail || "",
      contactPhone: details?.contactPhone || "",
      relationWithGuest: details?.relationWithGuest || "",
      referringPerson: details?.referringPerson || "",
      informationLevel: details?.informationLevel || null,
      religion: details?.religion || null,
      funeralService: details?.funeralService || false,
      tumor: details?.tumor || "",
      metastasis: details?.metastasis || false,
      metastasisLocation: details?.metastasisLocation || "",
      personalHistory: details?.personalHistory || "",
      ecog: details?.ecog || null,
      specificOncologicalTreatment:
        details?.specificOncologicalTreatment || null,
      surgery: details?.surgery || "",
      radiotherapy: details?.radiotherapy || "",
      chemotherapy: details?.chemotherapy || "",
      hormonetherapy: details?.hormonetherapy || "",
      opioidTreatment: details?.opioidTreatment || false,
      opioidName: details?.opioidName || "",
      otherMedications: details?.otherMedications || "",
      fluctuatingCourse: details?.fluctuatingCourse || false,
      attentionDisturbance: details?.attentionDisturbance || false,
      disorganizedThinking: details?.disorganizedThinking || false,
      alteredConsciousnessLevel: details?.alteredConsciousnessLevel || false,
      heartRate: details?.heartRate || null,
      bloodPressureSystolic: details?.bloodPressureSystolic || null,
      bloodPressureDiastolic: details?.bloodPressureDiastolic || null,
      respiratoryRate: details?.respiratoryRate || null,
      temperature: details?.temperature || null,
      pain: details?.pain || null,
      tiredness: details?.tiredness || null,
      nausea: details?.nausea || null,
      depression: details?.depression || null,
      anxiety: details?.anxiety || null,
      sleepiness: details?.sleepiness || null,
      appetite: details?.appetite || null,
      dyspnoea: details?.dyspnoea || null,
      difficultySleeping: details?.difficultySleeping || null,
      wellBeing: details?.wellBeing || null,
      mobility: details?.mobility || null,
      mobilityCause: details?.mobilityCause || null,
      hygiene: details?.hygiene || null,
      bathTransfer: details?.bathTransfer || null,
      oralHealth: details?.oralHealth || null,
      swallowing: details?.swallowing || null,
      nutrition: details?.nutrition || null,
      hydration: details?.hydration || null,
      hydrationMethod: details?.hydrationMethod || null,
      abdominalStatus: details?.abdominalStatus || null,
      urinaryFunctions: details?.urinaryFunctions || null,
      urineCharacteristics: details?.urineCharacteristics || null,
      bowelFunction: details?.bowelFunction || null,
      stoolConsistency: details?.stoolConsistency || null,
      respiratorySystem: details?.respiratorySystem || null,
      sputumType: details?.sputumType || "",
      pressureUlcers: details?.pressureUlcers || null,
      pressureUlcersLocation: details?.pressureUlcersLocation || "",
      skinLesions: details?.skinLesions || "",
      edema: details?.edema || false,
      edemaLocation: details?.edemaLocation || "",
      ostomies: details?.ostomies || false,
      ostomyType: details?.ostomyType || "",
      otherDisorders: details?.otherDisorders || "",
      carePlan: details?.carePlan || "",
      status: details?.status || "ALIVE",
      hospitalizationDate: details?.hospitalizationDate
        ? new Date(details?.hospitalizationDate)
        : null,
      createdAt: details?.createdAt || new Date(),
      updatedAt: details?.updatedAt || new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submit");
    try {
      const response = await upsertGuest({
        id: details?.id || v4(),
        admissionDate: values.admissionDate || "",
        birthdate: values.birthdate || "",
        name: values.name,
        lastname: values.lastname,
        dni: values.dni,
        streetName: values.streetName || "",
        streetNumber: values.streetNumber || 0,
        province: values.province || "",
        city: values.city || "",
        zipCode: values.zipCode || 0,
        socialSecurityId: values.socialSecurityId || "",
        socialSecurityNumber: values.socialSecurityNumber || "",
        contactName: values.contactName || "",
        contactEmail: values.contactEmail || "",
        contactPhone: values.contactPhone || "",
        relationWithGuest: values.relationWithGuest || "",
        referringPerson: values.referringPerson || "",
        informationLevel: values.informationLevel || null,
        religion: values.religion || null,
        funeralService: values.funeralService || null,
        tumor: values.tumor || "",
        metastasis: values.metastasis || false,
        metastasisLocation: values.metastasisLocation || "",
        personalHistory: values.personalHistory || "",
        ecog: values.ecog || null,
        specificOncologicalTreatment:
          values.specificOncologicalTreatment || null,
        surgery: values.surgery || "",
        radiotherapy: values.radiotherapy || "",
        chemotherapy: values.chemotherapy || "",
        hormonetherapy: values.hormonetherapy || "",
        opioidTreatment: values.opioidTreatment || false,
        opioidName: values.opioidName || "",
        otherMedications: values.otherMedications || "",
        fluctuatingCourse: values.fluctuatingCourse || false,
        attentionDisturbance: values.attentionDisturbance || false,
        disorganizedThinking: values.disorganizedThinking || false,
        alteredConsciousnessLevel: values.alteredConsciousnessLevel || false,
        heartRate: values.heartRate || null,
        bloodPressureSystolic: values.bloodPressureSystolic || null,
        bloodPressureDiastolic: values.bloodPressureDiastolic || null,
        respiratoryRate: values.respiratoryRate || null,
        temperature: values.temperature || null,
        pain: values.pain || null,
        tiredness: values.tiredness || null,
        nausea: values.nausea || null,
        depression: values.depression || null,
        anxiety: values.anxiety || null,
        sleepiness: values.sleepiness || null,
        appetite: values.appetite || null,
        dyspnoea: values.dyspnoea || null,
        difficultySleeping: values.difficultySleeping || null,
        wellBeing: values.wellBeing || null,
        mobility: values.mobility || null,
        mobilityCause: values.mobilityCause || null,
        hygiene: values.hygiene || null,
        bathTransfer: values.bathTransfer || null,
        oralHealth: values.oralHealth || null,
        swallowing: values.swallowing || null,
        nutrition: values.nutrition || null,
        hydration: values.hydration || null,
        hydrationMethod: values.hydrationMethod || null,
        abdominalStatus: values.abdominalStatus || null,
        urinaryFunctions: values.urinaryFunctions || null,
        urineCharacteristics: values.urineCharacteristics || null,
        bowelFunction: values.bowelFunction || null,
        stoolConsistency: values.stoolConsistency || null,
        respiratorySystem: values.respiratorySystem || null,
        sputumType: values.sputumType || "",
        pressureUlcers: values.pressureUlcers || null,
        pressureUlcersLocation: values.pressureUlcersLocation || "",
        skinLesions: values.skinLesions || "",
        edema: values.edema || false,
        edemaLocation: values.edemaLocation || "",
        ostomies: values.ostomies || false,
        ostomyType: values.ostomyType || "",
        otherDisorders: values.otherDisorders || "",
        carePlan: values.carePlan || "",
        status: values.status || "ALIVE",
        hospitalizationDate: values.hospitalizationDate || null,
        dateOfDeath: values.dateOfDeath || null,
        age: null,
        createdAt: values.createdAt,
        updatedAt: values.updatedAt,
      });
      if (!response) throw new Error("No response from server");

      toast({
        title: "Éxito",
        description: "Datos cargados con éxito.",
        variant: "success",
      });

      setClose();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description:
          "Ocurrió un error al guardar los datos, vuelva a intentarlo. Si el error persiste, póngase en contacto con el soporte técnico.",
        variant: "destructive",
      });
    }
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
          className="">
          <Tabs defaultValue="account" className="w-full mb-4">
            <TabsList className="w-full">
              <TabsTrigger value="guest" className="w-full">
                Huésped
              </TabsTrigger>
              <TabsTrigger value="interview" className="w-full">
                Entrevista
              </TabsTrigger>
            </TabsList>
            <TabsContent value="guest">
              <FormField
                control={form.control}
                name="admissionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de admisión</FormLabel>
                    <FormControl>
                      <DatePicker
                        selected={field.value} // Usa el valor del field
                        onChange={(date) => field.onChange(date)} // Actualiza el valor en el formulario
                        className="w-full px-3 py-2 border rounded-md text-sm"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Selecciona una fecha"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        maxDate={new Date()} // Evita seleccionar fechas futuras
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthdate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de nacimiento</FormLabel>
                    <FormControl>
                      <DatePicker
                        selected={field.value} // Usa el valor del field
                        onChange={(date) => field.onChange(date)} // Actualiza el valor en el formulario
                        className="w-full px-3 py-2 border rounded-md text-sm"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Selecciona una fecha"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        maxDate={new Date()} // Evita seleccionar fechas futuras
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombres</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Juan Manuel"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellidos</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Perez Gutierrez"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="streetName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calle</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Almirante Brown"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="streetNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calle</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1234"
                        {...field}
                        value={field.value ?? 0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Provincia</FormLabel>
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleMunicipios(value);
                      }}
                      value={field.value || ""}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Provincia" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {provinces?.provincias?.length > 0 ? (
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          provinces.provincias.map((province: any) => (
                            <SelectItem
                              key={province.id}
                              value={province.nombre}>
                              <div className="flex cursor-pointer items-center gap-2">
                                <p>{province.nombre}</p>
                              </div>
                            </SelectItem>
                          ))
                        ) : (
                          <p>No se encontraron provincias</p>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socialSecurityId"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      {...field}
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value || ""}>
                      <FormLabel>Obra social</FormLabel>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {socialSecurities.map((socialSecurity) => (
                          <SelectItem
                            key={socialSecurity.id}
                            value={socialSecurity.id}>
                            {socialSecurity.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="interview">
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem
                    className={"text-muted-foreground cursor-not-allowed"}>
                    <FormLabel>Nombre de contacto</FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="number"
                        placeholder="Cantidad en stock"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Número de teléfono</FormLabel>
                    <FormControl>
                      <PhoneInput
                        defaultCountry="AR"
                        placeholder="Teléfono"
                        international
                        withCountryCallingCode
                        onChange={field.onChange}
                        value={field.value}
                        className="input-phone"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>

          <Submit isLoading={isLoading} type="submit" />
        </form>
      </Form>
    </>
  );
};

export default GuestForm;
