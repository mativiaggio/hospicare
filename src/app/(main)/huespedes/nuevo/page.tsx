import React from "react";
import Record from "@/modules/guests/frontend/record";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NewGuestPage = () => {
  return (
    <div className="flex jusitfy-center items-center w-full pb-10">
      <Tabs
        defaultValue="guest-info"
        className="w-full flex flex-col items-center">
        <TabsList className="w-full">
          <TabsTrigger value="guest-info" className="w-full">
            Huésped
          </TabsTrigger>
          <TabsTrigger value="contacts" className="w-full">
            Contactos
          </TabsTrigger>
          <TabsTrigger value="eval-cog" className="w-full">
            Eval. Cog
          </TabsTrigger>
          <TabsTrigger value="eval-fis" className="w-full">
            Eval. Fis
          </TabsTrigger>
        </TabsList>
        <TabsContent value="guest-info" className="w-full">
          <div className="w-full">
            <Record />
          </div>
        </TabsContent>
        <TabsContent value="contacts">Contactos</TabsContent>
      </Tabs>
    </div>
  );
};

export default NewGuestPage;
