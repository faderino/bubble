import FormContact from "@/components/form-contact";
import FormContactHeader from "@/components/form-contact/form-contact-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import styles from "@/styles/add-contact.styles";
import theme from "@/styles/theme";
import { X } from "lucide-react";
import Head from "next/head";

export default function AddContact() {
  return (
    <>
      <Head>
        <title>Bubble | New Contact</title>
        <meta name="description" content="Bubble: Manage Contacts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main css={styles.main}>
        <FormContactHeader
          title="Add contact"
          action={<Button variant="secondary">Save</Button>}
        />

        <FormContact>
          <Input placeholder="First name" />
          <div css={{ margin: "1rem 0" }}></div>
          <Input placeholder="Last name" />
        </FormContact>
      </main>
      ;
    </>
  );
}
