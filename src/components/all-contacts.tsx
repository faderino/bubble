import { useFavoriteContacts } from "@/context/favorite-contacts-context";
import { GET_CONTACT_LIST } from "@/graphql/queries";
import theme from "@/styles/theme";
import { useQuery } from "@apollo/client";
import { css } from "@emotion/react";
import { User2 } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import ContactList from "./contact-list/contact-list";
import ContactListItem from "./contact-list/contact-list-item";
import ContactListTitle from "./contact-list/contact-list-title";

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
      });
    }
  }

  if (loading) return;
  if (!data?.contact) return;

  return (
    <InfiniteScroll
      dataLength={data?.contact.length ?? 0}
      next={fetchNext}
      hasMore={true}
      loader=""
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
