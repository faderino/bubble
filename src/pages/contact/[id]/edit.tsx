import FormContact, {
  FORM_CONTACT_ID,
  FormValues,
} from "@/components/form-contact/form-contact";
import FormContactHeader from "@/components/form-contact/form-contact-header";
import { Button } from "@/components/ui/button";
import { defaultErrorMessage, mapError } from "@/error";
import { Phone_Pk_Columns_Input } from "@/graphql/__generated__/graphql";
import {
  ADD_CONTACT,
  EDIT_CONTACT,
  EDIT_PHONE_NUMBER,
} from "@/graphql/mutation";
import {
  GET_CONTACT_DETAIL,
  GET_CONTACT_LIST,
  GET_FAVORITE_CONTACT_LIST,
} from "@/graphql/queries";
import styles from "@/styles/add-contact.styles";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export default function AddContact() {
  const router = useRouter();
  const contactId = Number(router.query.id as string);

  const { data: contact } = useQuery(GET_CONTACT_DETAIL, {
    variables: { id: contactId },
  });

  const [editContact, { loading }] = useMutation(EDIT_CONTACT, {
    refetchQueries: [GET_CONTACT_LIST, GET_FAVORITE_CONTACT_LIST],
  });

  const [editPhoneNumber] = useMutation(EDIT_PHONE_NUMBER, {
    refetchQueries: [GET_CONTACT_LIST, GET_FAVORITE_CONTACT_LIST],
  });

  async function handleSave(data: FormValues) {
    if (!contact?.contact_by_pk) return;

    try {
      await editContact({
        variables: {
          id: contact.contact_by_pk.id,
          _set: {
            first_name: data.firstName,
            last_name: data.lastName,
          },
        },
      });

      const editPhones = [
        editPhoneNumber({
          variables: {
            pk_columns: { contact_id: contactId, number: "123123" },
            new_phone_number: "123456",
          },
        }),
      ];

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
          title="Edit contact"
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
