import ContactListHeader from "@/components/contact-list-header";
import ContactList from "@/components/contact-list/contact-list";
import ContactListItem from "@/components/contact-list/contact-list-item";
import ContactListTitle from "@/components/contact-list/contact-list-title";
import { SEARCH_CONTACTS } from "@/graphql/queries";
import { useFavoriteContacts } from "@/hooks/use-favorite-contacts";
import sharedStyles from "@/styles/shared.styles";
import theme from "@/styles/theme";
import { useQuery } from "@apollo/client";
import { css } from "@emotion/react";
import { User2 } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";

const styles = {
  main: css({
    padding: "6rem 1rem 1rem 1rem",
    minHeight: "100vh",
  }),
};

export default function Search() {
  const router = useRouter();
  const searchParams = router.query as { q: string };
  const splitBySpace = searchParams.q?.split(" ") ?? [];

  const {
    state: { favoriteContacts },
  } = useFavoriteContacts();
  const { data, loading } = useQuery(SEARCH_CONTACTS, {
    variables: {
      where: {
        _or: [
          {
            first_name: {
              _ilike: `%${searchParams.q}%`,
            },
          },
          {
            last_name: {
              _ilike: `%${searchParams.q}%`,
            },
          },
          ...splitBySpace.map((q) => ({
            first_name: {
              _ilike: `%${q}%`,
            },
          })),
          ...splitBySpace.map((q) => ({
            last_name: {
              _ilike: `%${q}%`,
            },
          })),
        ],
      },
    },
  });

  if (loading) return;
  if (!data?.contact) return;

  return (
    <>
      <Head>
        <title>Bubble | Search for {searchParams.q}</title>
        <meta name="description" content="Bubble: Manage Contacts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main css={styles.main}>
        <ContactListHeader />

        <ContactList>
          {data.contact.length === 0 ? (
            <div css={sharedStyles.emptyResult}>
              Contact not found. Try other keyword.
            </div>
          ) : (
            <>
              <ContactListTitle>
                <User2 size="1.1rem" color={theme.colors.indigo} />
                CONTACTS
              </ContactListTitle>

              {data.contact.map((contact) => (
                <ContactListItem
                  key={contact.id}
                  contact={contact}
                  isFavorite={favoriteContacts.includes(contact.id)}
                />
              ))}
            </>
          )}
        </ContactList>
      </main>
    </>
  );
}
