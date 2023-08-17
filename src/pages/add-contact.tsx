import FormContact, {
  FORM_CONTACT_ID,
  FormValues,
} from "@/components/form-contact/form-contact";
import FormContactHeader from "@/components/form-contact/form-contact-header";
import { Button } from "@/components/ui/button";
import { defaultErrorMessage, mapError } from "@/error";
import { ADD_CONTACT } from "@/graphql/mutation";
import { GET_CONTACT_LIST } from "@/graphql/queries";
import styles from "@/styles/add-contact.styles";
import { ApolloError, useMutation } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export default function AddContact() {
  const router = useRouter();
  const [addContact, { loading }] = useMutation(ADD_CONTACT, {
    refetchQueries: [GET_CONTACT_LIST],
  });

  async function handleSave(data: FormValues) {
    try {
      await addContact({
        variables: {
          first_name: data.firstName,
          last_name: data.lastName,
          phones: data.phones,
        },
      });
      toast.success(`${data.firstName} ${data.lastName} added to contact.`);
      router.push("/");
    } catch (error) {
      if (error instanceof ApolloError) {
        const message = error.graphQLErrors[0].message;
        if (message in mapError) {
          toast.error(mapError[message]);
        } else {
          toast.error(defaultErrorMessage);
        }
        return;
      }
      toast.error(defaultErrorMessage);
    }
  }

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
          action={
            <Button
              variant="secondary"
              type="submit"
              form={FORM_CONTACT_ID}
              disabled={loading}
            >
              Save
            </Button>
          }
        />

        <FormContact handleSave={handleSave} />
      </main>
      ;
    </>
  );
}
