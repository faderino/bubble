import favoriteContactsReducer, {
  FavoriteContactsAction,
  FavoriteContactsState,
  getFavoriteContactsAction
} from "@/reducer/favorite-contacts-reducer";
import React, { createContext, useEffect, useReducer } from "react";

export const FavoriteContactsContext = createContext<{
  state: FavoriteContactsState;
  dispatch: React.Dispatch<FavoriteContactsAction>;
} | null>(null);

const initialState: FavoriteContactsState = {
  favoriteContacts: [],
};

export function FavoriteContactsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(favoriteContactsReducer, initialState);
  const value = { state, dispatch };

  useEffect(() => {
    dispatch(getFavoriteContactsAction());
  }, []);

  return (
    <FavoriteContactsContext.Provider value={value}>
      {children}
    </FavoriteContactsContext.Provider>
  );
}
