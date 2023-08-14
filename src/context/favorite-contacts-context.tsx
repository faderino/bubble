import React, { createContext, useContext, useEffect, useReducer } from "react";

const FAVORITE_CONTACTS_LOCAL_STORAGE_KEY = "favoriteContacts";

const FavoriteContactsContext = createContext<{
  state: FavoriteContactsState;
  dispatch: React.Dispatch<FavoriteContactsAction>;
} | null>(null);

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

type FavoriteContactsAction =
  | AddToFavoriteAction
  | RemoveFromFavoriteAction
  | GetFavoriteContactsAction;

interface FavoriteContactsState {
  favoriteContacts: number[];
}

function favoriteContactsReducer(
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

const initialState: FavoriteContactsState = {
  favoriteContacts: [],
};

export function FavoriteContactsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(favoriteContactsReducer, initialState);
  useEffect(() => {
    dispatch(getFavoriteContactsAction());
  }, []);
  const value = { state, dispatch };
  return (
    <FavoriteContactsContext.Provider value={value}>
      {children}
    </FavoriteContactsContext.Provider>
  );
}

export function useFavoriteContacts() {
  const context = useContext(FavoriteContactsContext);
  if (!context) {
    throw new Error(
      "useFavoriteContacts must be used within a FavoriteContactsProvider"
    );
  }

  return context;
}
