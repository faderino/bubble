import { useFavoriteContacts } from "@/context/favorite-contacts-context";
import {
  addToFavoriteAction,
  removeFromFavoriteAction,
} from "@/reducer/favorite-contacts-reducer";
import theme from "@/styles/theme";
import { Contact } from "@/types";
import { Pencil, Star, Trash2 } from "lucide-react";
import Avatar from "../ui/avatar";
import { ActionButton } from "../ui/button";
import styles from "./contact-list-item.styles";
import { useMutation } from "@apollo/client";
import { DELETE_CONTACT } from "@/graphql/mutation";
import { GET_CONTACT_LIST } from "@/graphql/queries";
import { toast, useToaster } from "react-hot-toast";

interface ContactListItemProps {
  contact: Contact;
  isFavorite?: boolean;
}

export default function ContactListItem({
  contact,
  isFavorite = false,
}: ContactListItemProps) {
  const { dispatch } = useFavoriteContacts();

  const [deleteContact] = useMutation(DELETE_CONTACT, {
    variables: { id: contact.id },
    refetchQueries: [GET_CONTACT_LIST],
  });

  function toggleFavoriteContact() {
    dispatch(
      isFavorite
        ? removeFromFavoriteAction(contact.id)
        : addToFavoriteAction(contact.id)
    );
  }

  async function handleDeleteContact() {
    try {
      const resp = await deleteContact();
      if (isFavorite) dispatch(removeFromFavoriteAction(contact.id));
      toast(`${contact.first_name + contact.last_name} deleted from contact.`);
    } catch (error) {
      toast.error("Something went wrong. Try again.");
    }
  }

  const fullName = contact.first_name + " " + contact.last_name;

  return (
    <div css={styles.itemContainer}>
      <div css={styles.item}>
        <div css={styles.person}>
          <div css={styles.avatarContainer}>
            <Avatar name={fullName} />
          </div>
          <p>{fullName}</p>
        </div>

        <div css={styles.phone}>{contact.phones[0].number}</div>
      </div>

      <div css={styles.action}>
        <ActionButton onClick={toggleFavoriteContact}>
          <Star
            size="1.1rem"
            color={
              isFavorite ? theme.colors.indigo : theme.colors.textSecondary
            }
          />
        </ActionButton>

        <ActionButton>
          <Pencil size="1.1rem" color={theme.colors.textSecondary} />
        </ActionButton>

        <ActionButton onClick={handleDeleteContact}>
          <Trash2 size="1.1rem" color={theme.colors.textSecondary} />
        </ActionButton>
      </div>
    </div>
  );
}
