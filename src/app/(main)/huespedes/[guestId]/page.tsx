import React from "react";
import ErrorPage from "@/components/pages/error";
import Record from "@/modules/guests/frontend/record";
import { findById } from "@/modules/guests/backend/queries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  params: Promise<{ guestId: string }>;
};

const EditGuestPage = async ({ params }: Props) => {
  const guestId = (await params).guestId;

  const guest = await findById(guestId);

  if (!guest) return <ErrorPage />;

  return (
    <Tabs defaultValue="guest" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="guest">Huésped</TabsTrigger>
        <TabsTrigger value="contacts">Entrevistados</TabsTrigger>
        <TabsTrigger value="cog.eval">Eval. Cog.</TabsTrigger>
        <TabsTrigger value="phi.eval">Eval. Fis.</TabsTrigger>
        <TabsTrigger value="phi.eval">Estudios comp.</TabsTrigger>
      </TabsList>
      <TabsContent value="guest">
        <Record details={guest} />
      </TabsContent>
      <TabsContent value="contacts"></TabsContent>
    </Tabs>
  );
};

export default EditGuestPage;
