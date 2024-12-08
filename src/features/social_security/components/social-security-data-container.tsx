"use client";
import { useGetSocialSecurity } from "../api/use-get-social-security";
import { SocialSecurityDataTable } from "./social-security-data-table";

export default function SocialSecurityDataContainer() {
  const { data } = useGetSocialSecurity();
  return <SocialSecurityDataTable socialSecurityData={data} />;
}
