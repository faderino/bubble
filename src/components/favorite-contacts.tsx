import { useFavoriteContacts } from "@/context/favorite-contacts-context";
import { GET_CONTACT_LIST } from "@/graphql/queries";
import theme from "@/styles/theme";
import { useQuery } from "@apollo/client";
import { Sparkles } from "lucide-react";
import ContactList from "./contact-list/contact-list";
import ContactListItem from "./contact-list/contact-list-item";
import ContactListTitle from "./contact-list/contact-list-title";

export default function FavoriteContacts() {
  const {
    state: { favoriteContacts },
  } = useFavoriteContacts();

  const { data, loading } = useQuery(GET_CONTACT_LIST, {
    variables: {
      where: {
        id: {
          _in: favoriteContacts,
        },
      },
    },
  });

  if (loading) return;
  if (!data?.contact) return;

  return (
    <ContactList>
      <ContactListTitle>
        <Sparkles size="1.1rem" color={theme.colors.yellow} />
        FAVORITE CONTACTS ({data.contact.length})
      </ContactListTitle>

      {data.contact.map((contact) => (
        <ContactListItem key={contact.id} contact={contact} isFavorite />
      ))}
    </ContactList>
  );
}
