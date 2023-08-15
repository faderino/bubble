import AllContacts from "@/components/all-contacts";
import ContactListHeader from "@/components/contact-list-header";
import FavoriteContacts from "@/components/favorite-contacts";
import { FloatingButton } from "@/components/ui/button";
import { mediaQuery } from "@/styles/theme";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/home.styles";

export default function Home() {
  const router = useRouter();

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
        <AllContacts />

        <div css={{ [mediaQuery.sm]: { display: "none" } }}>
          <FloatingButton onClick={() => router.push("/add-contact")} />
        </div>
      </main>
    </>
  );
}
