import ContactListHeader from "@/components/contact-list-header";
import FavoriteContacts from "@/components/favorite-contacts";
import Head from "next/head";
import styles from "../styles/home.styles";

export default function Home() {
  return (
    <>
      <Head>
        <title>Bubble | Contact List</title>
        <meta name="description" content="Bubble: Manage Contacts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main css={styles.main}>
        <ContactListHeader />

        <FavoriteContacts />
      </main>
    </>
  );
}
