const FAVORITE_CONTACTS_LOCAL_STORAGE_KEY = "favoriteContacts";

enum FavoriteContactsActionType {
  ADD_TO_FAVORITE = "addToFavorite",
  REMOVE_FROM_FAVORITE = "removeFromFavorite",
  GET_FAVORITE_CONTACTS = "getFavoriteContacts",
}

interface AddToFavoriteAction {
  type: FavoriteContactsActionType.ADD_TO_FAVORITE;
  payload: number;
}

export function addToFavoriteAction(
  payload: AddToFavoriteAction["payload"]
): AddToFavoriteAction {
  return { type: FavoriteContactsActionType.ADD_TO_FAVORITE, payload };
}

interface RemoveFromFavoriteAction {
  type: FavoriteContactsActionType.REMOVE_FROM_FAVORITE;
  payload: number;
}

export function removeFromFavoriteAction(
  payload: RemoveFromFavoriteAction["payload"]
): RemoveFromFavoriteAction {
  return { type: FavoriteContactsActionType.REMOVE_FROM_FAVORITE, payload };
}

interface GetFavoriteContactsAction {
  type: FavoriteContactsActionType.GET_FAVORITE_CONTACTS;
}

export function getFavoriteContactsAction(): GetFavoriteContactsAction {
  return { type: FavoriteContactsActionType.GET_FAVORITE_CONTACTS };
}

export type FavoriteContactsAction =
  | AddToFavoriteAction
  | RemoveFromFavoriteAction
  | GetFavoriteContactsAction;

export interface FavoriteContactsState {
  favoriteContacts: number[];
}

export default function favoriteContactsReducer(
  state: FavoriteContactsState,
  action: FavoriteContactsAction
) {
  switch (action.type) {
    case FavoriteContactsActionType.ADD_TO_FAVORITE: {
      const newState: FavoriteContactsState = {
        ...state,
        favoriteContacts: [...state.favoriteContacts, action.payload],
      };

      window.localStorage.setItem(
        FAVORITE_CONTACTS_LOCAL_STORAGE_KEY,
        JSON.stringify(newState.favoriteContacts)
      );

      return newState;
    }
    case FavoriteContactsActionType.REMOVE_FROM_FAVORITE: {
      const newState: FavoriteContactsState = {
        ...state,
        favoriteContacts: state.favoriteContacts.filter(
          (id) => id !== action.payload
        ),
      };

      window.localStorage.setItem(
        FAVORITE_CONTACTS_LOCAL_STORAGE_KEY,
        JSON.stringify(newState.favoriteContacts)
      );

      return newState;
    }
    case FavoriteContactsActionType.GET_FAVORITE_CONTACTS: {
      const favoriteContacts = JSON.parse(
        window.localStorage.getItem(FAVORITE_CONTACTS_LOCAL_STORAGE_KEY) || "[]"
      );
      return { ...state, favoriteContacts };
    }
  }
}
