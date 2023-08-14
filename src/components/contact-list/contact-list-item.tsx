import { Contact } from "@/types";
import styles from "./contact-list-item.styles";
import Avatar from "../ui/avatar";
import {
  addToFavoriteAction,
  removeFromFavoriteAction,
  useFavoriteContacts,
} from "@/context/favorite-contacts-context";
import { Star } from "lucide-react";
import { ActionButton, Button } from "../ui/button";
import theme from "@/styles/theme";

interface ContactListItemProps {
  contact: Contact;
  isFavorite?: boolean;
}

export default function ContactListItem({
  contact,
  isFavorite = false,
}: ContactListItemProps) {
  const { dispatch } = useFavoriteContacts();

  return (
    <div css={styles.itemContainer}>
      <div css={styles.item}>
        <div css={styles.person}>
          <div css={styles.avatarContainer}>
            <Avatar name={contact.first_name + " " + contact.last_name} />
          </div>
          <p>{contact.first_name}</p>
        </div>

        <div css={styles.phone}>{contact.phones[0].number}</div>
      </div>

      <div css={styles.action}>
        <ActionButton
          onClick={() =>
            dispatch(
              isFavorite
                ? removeFromFavoriteAction(contact.id)
                : addToFavoriteAction(contact.id)
            )
          }
        >
          <Star
            size="1.1rem"
            color={
              isFavorite ? theme.colors.indigo : theme.colors.textSecondary
            }
          />
        </ActionButton>
      </div>
    </div>
  );
}
