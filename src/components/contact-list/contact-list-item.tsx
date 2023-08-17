import { useDeleteContact } from "@/hooks/use-delete-contact";
import { useFavoriteContacts } from "@/hooks/use-favorite-contacts";
import theme from "@/styles/theme";
import { Contact } from "@/types";
import { Pencil, Star, Trash2 } from "lucide-react";
import { useRouter } from "next/router";
import Avatar from "../ui/avatar";
import { ActionButton } from "../ui/button";
import styles from "./contact-list-item.styles";

interface ContactListItemProps {
  contact: Contact;
  isFavorite?: boolean;
}

export default function ContactListItem({
  contact,
  isFavorite = false,
}: ContactListItemProps) {
  const router = useRouter();
  const { dispatch, toggleFavoriteContact } = useFavoriteContacts();
  const handleDeleteContact = useDeleteContact(dispatch);

  const fullName = contact.first_name + " " + contact.last_name;

  return (
    <div css={styles.itemContainer}>
      <div
        css={styles.item}
        onClick={() => router.push(`/contact/${contact.id}`)}
      >
        <div css={styles.person}>
          <div css={styles.avatarContainer}>
            <Avatar name={fullName} />
          </div>
          <p>{fullName}</p>
        </div>

        <div css={styles.phone}>{contact.phones[0]?.number}</div>
      </div>

      <div css={styles.action}>
        <ActionButton
          onClick={() =>
            toggleFavoriteContact(isFavorite, contact.id, fullName)
          }
        >
          <Star
            size="1.1rem"
            color={
              isFavorite ? theme.colors.indigo : theme.colors.textSecondary
            }
            fill={isFavorite ? theme.colors.indigo : "none"}
          />
        </ActionButton>

        <ActionButton
          onClick={() => router.push(`/contact/${contact.id}/edit`)}
        >
          <Pencil size="1.1rem" color={theme.colors.textSecondary} />
        </ActionButton>

        <ActionButton
          onClick={() => handleDeleteContact(contact.id, isFavorite)}
        >
          <Trash2 size="1.1rem" color={theme.colors.textSecondary} />
        </ActionButton>
      </div>
    </div>
  );
}
