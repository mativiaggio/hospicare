import ErrorPage from "@/components/pages/error";
import { findById } from "@/modules/guests/backend/queries";
import Record from "@/modules/guests/frontend/record";
import React from "react";

type Props = {
  params: Promise<{ guestId: string }>;
};

const EditGuestPage = async ({ params }: Props) => {
  const guestId = (await params).guestId;

  const guest = await findById(guestId);

  if (!guest) return <ErrorPage />;

  return <Record details={guest} />;
};

export default EditGuestPage;
