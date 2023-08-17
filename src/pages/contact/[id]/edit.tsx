import FormContact, {
  FORM_CONTACT_ID,
  FormValues,
} from "@/components/form-contact/form-contact";
import FormContactHeader from "@/components/form-contact/form-contact-header";
import Avatar from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { defaultErrorMessage, mapError } from "@/error";
import {
  ADD_PHONE_NUMBER_TO_CONTACT,
  EDIT_CONTACT,
  EDIT_PHONE_NUMBER,
} from "@/graphql/mutation";
import {
  GET_CONTACT_DETAIL,
  GET_CONTACT_LIST,
  GET_FAVORITE_CONTACT_LIST,
} from "@/graphql/queries";
import styles from "@/styles/add-contact.styles";
import sharedStyles from "@/styles/shared.styles";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const REFETCH_QUERIES = [
  GET_CONTACT_LIST,
  GET_FAVORITE_CONTACT_LIST,
  GET_CONTACT_DETAIL,
];

export default function AddContact() {
  const router = useRouter();
  const contactId = Number(router.query.id as string);

  const { data: contact, loading: getContactLoading } = useQuery(
    GET_CONTACT_DETAIL,
    {
      variables: { id: contactId },
    }
  );

  const [editContact, { loading }] = useMutation(EDIT_CONTACT, {
    refetchQueries: REFETCH_QUERIES,
  });

  const [editPhoneNumber] = useMutation(EDIT_PHONE_NUMBER, {
    refetchQueries: REFETCH_QUERIES,
  });

  const [addPhoneNumberToContact] = useMutation(ADD_PHONE_NUMBER_TO_CONTACT, {
    refetchQueries: REFETCH_QUERIES,
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

      const phoneNumbersToUpdate = data.phones.slice(
        0,
        contact.contact_by_pk.phones.length
      );
      const editPhoneNumberMutations = phoneNumbersToUpdate.map(
        (phone, index) =>
          editPhoneNumber({
            variables: {
              new_phone_number: phone.number,
              pk_columns: {
                contact_id: contactId,
                number: contact.contact_by_pk!.phones[index].number,
              },
            },
          })
      );
      await Promise.all(editPhoneNumberMutations);

      if (data.phones.length > contact.contact_by_pk.phones.length) {
        const newPhoneNumbers = data.phones.slice(
          contact.contact_by_pk.phones.length
        );
        const newPhoneNumberMutations = newPhoneNumbers.map((phone) =>
          addPhoneNumberToContact({
            variables: {
              contact_id: contactId,
              phone_number: phone.number,
            },
          })
        );
        await Promise.all(newPhoneNumberMutations);
      }

      toast.success("Update contact success.");
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
        <title>Bubble | Edit Contact</title>
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

        {getContactLoading ? (
          <div css={sharedStyles.loadingText}>Getting contact info...</div>
        ) : (
          <>
            <div
              css={{ width: 128, height: 128, margin: "2rem auto 1rem auto" }}
            >
              <Avatar
                name={`${contact?.contact_by_pk?.first_name} ${contact?.contact_by_pk?.last_name}`}
                size={128}
              />
            </div>
            <FormContact
              type="form-edit"
              handleSave={handleSave}
              contactDetail={contact?.contact_by_pk}
            />
          </>
        )}
      </main>
      ;
    </>
  );
}
