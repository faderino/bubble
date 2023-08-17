import { FavoriteContactsContext } from "@/context/favorite-contacts-context";
import {
  addToFavoriteAction,
  removeFromFavoriteAction,
} from "@/reducer/favorite-contacts-reducer";
import { useContext } from "react";
import { toast } from "react-hot-toast";

export function useFavoriteContacts() {
  const context = useContext(FavoriteContactsContext);
  if (!context) {
    throw new Error(
      "useFavoriteContacts must be used within a FavoriteContactsProvider"
    );
  }

  function toggleFavoriteContact(
    isFavorite: boolean,
    contactId: number,
    fullName: string
  ) {
    if (isFavorite) {
      context?.dispatch(removeFromFavoriteAction(contactId));
      toast(`${fullName} removed from favorites.`);
      return;
    }

    context?.dispatch(addToFavoriteAction(contactId));
    toast(`${fullName} added to favorites.`);
  }

  return { ...context, toggleFavoriteContact };
}
