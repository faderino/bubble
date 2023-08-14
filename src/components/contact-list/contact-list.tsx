import { Contact } from "@/types";
import React from "react";

interface ContactListProps {
  contacts: Contact[];
  children: React.ReactNode;
}

export default function ContactList({ children }: ContactListProps) {
  return <div>{children}</div>;
}
