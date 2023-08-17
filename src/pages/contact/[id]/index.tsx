import FormContact from "@/components/form-contact/form-contact";
import FormContactHeader from "@/components/form-contact/form-contact-header";
import Avatar from "@/components/ui/avatar";
import { ActionButton } from "@/components/ui/button";
import { GET_CONTACT_DETAIL } from "@/graphql/queries";
import { useDeleteContact } from "@/hooks/use-delete-contact";
import { useFavoriteContacts } from "@/hooks/use-favorite-contacts";
import sharedStyles from "@/styles/shared.styles";
import theme from "@/styles/theme";
import { useQuery } from "@apollo/client";
import { Pencil, Star, Trash2 } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function ContactDetail() {
  const router = useRouter();
  const contactId = Number(router.query.id as string);

  const {
    state: { favoriteContacts },
    dispatch,
    toggleFavoriteContact,
  } = useFavoriteContacts();
  const isFavorite = favoriteContacts.includes(contactId);

  const { data: contact, loading } = useQuery(GET_CONTACT_DETAIL, {
    variables: { id: contactId },
  });
  const fullName = `${
    contact?.contact_by_pk?.first_name ||
    "" + contact?.contact_by_pk?.last_name ||
    ""
  }`;

  const handleDeleteContact = useDeleteContact(dispatch);

  if (loading) {
    return <div css={sharedStyles.loadingText}>Getting contact info...</div>;
  }

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
        {!contact?.contact_by_pk ? (
          <div css={sharedStyles.emptyResult}>Contact does not exist.</div>
        ) : (
          <>
            <FormContactHeader
              title=""
              action={
                <div
                  css={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <ActionButton
                    onClick={() =>
                      toggleFavoriteContact(isFavorite, contactId, fullName)
                    }
                  >
                    <Star
                      size="1.1rem"
                      color={
                        isFavorite
                          ? theme.colors.indigo
                          : theme.colors.textSecondary
                      }
                      fill={isFavorite ? theme.colors.indigo : "none"}
                    />
                  </ActionButton>

                  <ActionButton
                    onClick={() => router.push(`/contact/${contactId}/edit`)}
                  >
                    <Pencil size="1.1rem" color={theme.colors.textSecondary} />
                  </ActionButton>

                  <ActionButton
                    onClick={() =>
                      handleDeleteContact(contactId, isFavorite).then(() =>
                        router.push("/")
                      )
                    }
                  >
                    <Trash2 size="1.1rem" color={theme.colors.textSecondary} />
                  </ActionButton>
                </div>
              }
            />

            <div
              css={{ width: 128, height: 128, margin: "2rem auto 1rem auto" }}
            >
              <Avatar name={fullName} size={128} />
            </div>
            <FormContact
              type="display"
              handleSave={() => {}}
              contactDetail={contact?.contact_by_pk}
            />
          </>
        )}
      </main>
    </>
  );
}
