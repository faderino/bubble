import { useFavoriteContacts } from "@/context/favorite-contacts-context";
import { Order_By } from "@/graphql/__generated__/graphql";
import { GET_CONTACT_LIST } from "@/graphql/queries";
import sharedStyles from "@/styles/shared.styles";
import theme from "@/styles/theme";
import { useQuery } from "@apollo/client";
import { User2 } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import ContactList from "./contact-list/contact-list";
import ContactListItem from "./contact-list/contact-list-item";
import ContactListTitle from "./contact-list/contact-list-title";

export default function AllContacts() {
  const {
    state: { favoriteContacts },
  } = useFavoriteContacts();

  const { data, loading, fetchMore } = useQuery(GET_CONTACT_LIST, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    variables: {
      limit: 10,
      offset: 0,
      where: {
        id: {
          _nin: favoriteContacts,
        },
      },
      order_by: {
        created_at: Order_By.Desc,
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

  if (loading)
    return <div css={sharedStyles.loadingText}>Getting contacts...</div>;
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
