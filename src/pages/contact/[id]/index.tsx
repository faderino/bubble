import FormContact from "@/components/form-contact/form-contact";
import FormContactHeader from "@/components/form-contact/form-contact-header";
import Avatar from "@/components/ui/avatar";
import { ActionButton } from "@/components/ui/button";
import { useFavoriteContacts } from "@/context/favorite-contacts-context";
import { defaultErrorMessage } from "@/error";
import { DELETE_CONTACT } from "@/graphql/mutation";
import {
  GET_CONTACT_DETAIL,
  GET_CONTACT_LIST,
  GET_FAVORITE_CONTACT_LIST,
  SEARCH_CONTACTS,
} from "@/graphql/queries";
import {
  addToFavoriteAction,
  removeFromFavoriteAction,
} from "@/reducer/favorite-contacts-reducer";
import sharedStyles from "@/styles/shared.styles";
import theme from "@/styles/theme";
import { useMutation, useQuery } from "@apollo/client";
import { Pencil, Star, Trash2 } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export default function ContactDetail() {
  const router = useRouter();
  const contactId = Number(router.query.id as string);

  const {
    state: { favoriteContacts },
    dispatch,
  } = useFavoriteContacts();

  const { data: contact, loading } = useQuery(GET_CONTACT_DETAIL, {
    variables: { id: contactId },
  });
  const isFavorite = favoriteContacts.includes(contactId);

  const [deleteContact] = useMutation(DELETE_CONTACT, {
    variables: { id: contactId },
    refetchQueries: [
      GET_CONTACT_LIST,
      GET_FAVORITE_CONTACT_LIST,
      SEARCH_CONTACTS,
    ],
  });

  const fullName = `${
    contact?.contact_by_pk?.first_name ||
    "" + contact?.contact_by_pk?.last_name ||
    ""
  }`;

  function toggleFavoriteContact() {
    if (isFavorite) {
      dispatch(removeFromFavoriteAction(contactId));
      toast(`${fullName} removed from favorites.`);
      return;
    }

    dispatch(addToFavoriteAction(contactId));
    toast(`${fullName} added to favorites.`);
  }

  async function handleDeleteContact() {
    try {
      const resp = await deleteContact();

      const deletedContact = resp.data?.delete_contact_by_pk;
      if (!deletedContact) return;

      if (isFavorite) dispatch(removeFromFavoriteAction(contactId));
      toast(
        `${
          deletedContact.first_name + deletedContact.last_name
        } deleted from contact.`
      );
      router.push("/");
    } catch (error) {
      toast.error(defaultErrorMessage);
    }
  }

  if (loading) {
    return <div css={sharedStyles.loadingText}>Getting contact info...</div>;
  }

  if (!contact?.contact_by_pk) return;

  return (
    <>
      <Head>
        <title>
          Bubble |{" "}
          {contact?.contact_by_pk?.first_name +
            " " +
            contact?.contact_by_pk?.last_name}
        </title>
        <meta name="description" content="Bubble: Manage Contacts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={sharedStyles.main}>
        <FormContactHeader
          title=""
          action={
            <div
              css={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <ActionButton onClick={toggleFavoriteContact}>
                <Star
                  size="1.1rem"
                  color={
                    isFavorite
                      ? theme.colors.indigo
                      : theme.colors.textSecondary
                  }
                />
              </ActionButton>

              <ActionButton
                onClick={() => router.push(`/contact/${contactId}/edit`)}
              >
                <Pencil size="1.1rem" color={theme.colors.textSecondary} />
              </ActionButton>

              <ActionButton onClick={handleDeleteContact}>
                <Trash2 size="1.1rem" color={theme.colors.textSecondary} />
              </ActionButton>
            </div>
          }
        />

        <div css={{ width: 128, height: 128, margin: "2rem auto 1rem auto" }}>
          <Avatar name={fullName} size={128} />
        </div>
        <FormContact
          type="display"
          handleSave={() => {}}
          contactDetail={contact?.contact_by_pk}
        />
      </main>
    </>
  );
}
