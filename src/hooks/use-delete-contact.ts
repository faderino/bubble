import { defaultErrorMessage } from "@/error";
import { DELETE_CONTACT } from "@/graphql/mutation";
import {
  GET_CONTACT_LIST,
  GET_FAVORITE_CONTACT_LIST,
  SEARCH_CONTACTS,
} from "@/graphql/queries";
import {
  FavoriteContactsAction,
  removeFromFavoriteAction,
} from "@/reducer/favorite-contacts-reducer";
import { useMutation } from "@apollo/client";
import { Dispatch } from "react";
import { toast } from "react-hot-toast";

export function useDeleteContact(dispatch: Dispatch<FavoriteContactsAction>) {
  const [deleteContact] = useMutation(DELETE_CONTACT, {
    refetchQueries: [
      GET_CONTACT_LIST,
      GET_FAVORITE_CONTACT_LIST,
      SEARCH_CONTACTS,
    ],
  });

  async function handleDeleteContact(contactId: number, isFavorite: boolean) {
    try {
      const resp = await deleteContact({ variables: { id: contactId } });

      const deletedContact = resp.data?.delete_contact_by_pk;
      if (!deletedContact) return;

      if (isFavorite) dispatch(removeFromFavoriteAction(contactId));
      toast(
        `${
          deletedContact.first_name + " " + deletedContact.last_name
        } deleted from contact.`
      );
    } catch (error) {
      toast.error(defaultErrorMessage);
    }
  }

  return handleDeleteContact;
}
