import { Button } from "@/components/ui/button";
import { GET_CONTACT_LIST } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import Head from "next/head";
import styles from "../styles/home.styles";

export default function Home() {
  const { data } = useQuery(GET_CONTACT_LIST, {
    variables: {
      limit: 1,
    },
  });

  return (
    <>
      <Head>
        <title>Bubble | Contact List</title>
        <meta name="description" content="Bubble: Manage Contacts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main css={styles.main}></main>
    </>
  );
}
