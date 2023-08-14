import { Contact } from "@/types";
import React from "react";
import ContactListItem from "./contact-list-item";

interface ContactListProps {
  contacts: Contact[];
  children: React.ReactNode;
}

export default function ContactList({ contacts, children }: ContactListProps) {
  return (
    <div>
      {children}
      {contacts.map((contact) => (
        <ContactListItem key={contact.id} contact={contact} />
      ))}
    </div>
  );
}
