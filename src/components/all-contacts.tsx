import { GET_CONTACT_LIST } from "@/graphql/queries";
import theme from "@/styles/theme";
import { useQuery } from "@apollo/client";
import { css } from "@emotion/react";
import InfiniteScroll from "react-infinite-scroll-component";
import ContactList from "./contact-list/contact-list";
import ContactListTitle from "./contact-list/contact-list-title";
import { useState } from "react";
import { Contact } from "@/types";

const styles = {
  infiniteScrollText: css({
    textAlign: "center",
    fontSize: theme.fontSize.xs,
    lineHeight: theme.lineHeight.xs,
    color: theme.colors.textSecondary,
  }),
};

export default function AllContacts() {
  const { data, loading, fetchMore } = useQuery(GET_CONTACT_LIST, {
    variables: {
      limit: 10,
      offset: 0,
    },
  });
  const [prevResult, setPrevResult] = useState<Contact[] | null>(null);

  function fetchNext() {
    if (data?.contact) {
      fetchMore({ variables: { offset: data.contact.length } }).then((data) =>
        setPrevResult(data.data.contact)
      );
    }
  }

  if (loading) return <p css={styles.infiniteScrollText}>Loading...</p>;
  if (!data?.contact) return;

  return (
    <InfiniteScroll
      dataLength={data.contact.length}
      next={fetchNext}
      hasMore={prevResult === null || prevResult.length > 0}
      loader={<p css={styles.infiniteScrollText}>Loading...</p>}
      endMessage={<p css={styles.infiniteScrollText}>No more data to load.</p>}
    >
      <ContactList contacts={data.contact}>
        <ContactListTitle>CONTACTS</ContactListTitle>
      </ContactList>
    </InfiniteScroll>
  );
}
