import { Contact } from "@/types";
import styles from "./contact-list-item.styles";
import Avatar from "../ui/avatar";

interface ContactListItemProps {
  contact: Contact;
}

export default function ContactListItem({ contact }: ContactListItemProps) {
  return (
    <div css={styles.item}>
      <div css={styles.person}>
        <Avatar name={contact.first_name + " " + contact.last_name} />
        <p>{contact.first_name}</p>
      </div>
      
      <div css={styles.phone}>{contact.phones[0].number}</div>
    </div>
  );
}
