import theme from "@/styles/theme";
import { Sparkles } from "lucide-react";
import ContactList from "./contact-list/contact-list";
import ContactListTitle from "./contact-list/contact-list-title";
import { Contact } from "@/types";

export default function FavoriteContacts() {
  return (
    <ContactList contacts={[]}>
      <ContactListTitle>
        <Sparkles size="1.1rem" color={theme.colors.yellow} />
        FAVORITE CONTACTS ({4})
      </ContactListTitle>
    </ContactList>
  );
}
