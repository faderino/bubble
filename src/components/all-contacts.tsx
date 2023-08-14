import { GET_CONTACT_LIST } from "@/graphql/queries";
import theme from "@/styles/theme";
import { useQuery } from "@apollo/client";
import { css } from "@emotion/react";
import InfiniteScroll from "react-infinite-scroll-component";
import ContactList from "./contact-list/contact-list";
import ContactListTitle from "./contact-list/contact-list-title";
import { useState } from "react";
import { Contact } from "@/types";
import { useFavoriteContacts } from "@/context/favorite-contacts-context";
import { User2 } from "lucide-react";
import ContactListItem from "./contact-list/contact-list-item";

const styles = {
  infiniteScrollText: css({
    textAlign: "center",
    fontSize: theme.fontSize.xs,
    lineHeight: theme.lineHeight.xs,
    color: theme.colors.textSecondary,
  }),
};

export default function AllContacts() {
  const {
    state: { favoriteContacts },
  } = useFavoriteContacts();

  const { data, loading, fetchMore } = useQuery(GET_CONTACT_LIST, {
    variables: {
      limit: 10,
      offset: 0,
      where: {
        id: {
          _nin: favoriteContacts,
        },
      },
    },
  });
  const [prevResult, setPrevResult] = useState<Contact[] | null>(null);

  function fetchNext() {
    if (data?.contact) {
      fetchMore({
        variables: { offset: data.contact.length },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            contact: [...prev.contact, ...fetchMoreResult.contact],
          });
        },
      }).then((data) => setPrevResult(data.data.contact));
    }
  }

  if (loading) return;
  if (!data?.contact) return;

  return (
    <InfiniteScroll
      dataLength={data.contact.length}
      next={fetchNext}
      hasMore={prevResult === null || prevResult.length > 0}
      loader={<p css={styles.infiniteScrollText}>Loading...</p>}
      endMessage={<p css={styles.infiniteScrollText}>No more data to load.</p>}
    >
      <ContactList>
        <ContactListTitle>
          <User2 size="1.1rem" color={theme.colors.indigo} />
          CONTACTS
        </ContactListTitle>

        {data.contact.map((contact) => (
          <ContactListItem key={contact.id} contact={contact} />
        ))}
      </ContactList>
    </InfiniteScroll>
  );
}
