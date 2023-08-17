import { FormValues } from "@/components/form-contact/form-contact";
import { CHECK_CONTACT_UNIQUE_NAME } from "@/graphql/queries";
import { Contact } from "@/types";
import { useLazyQuery } from "@apollo/client";
import { ErrorOption, UseFormSetError } from "react-hook-form";

export function useCheckUniqueName(
  type: "form-add" | "form-edit" | "display",
  setError: UseFormSetError<FormValues>,
  contactDetail?: Contact | null
) {
  const [checkUniqueName] = useLazyQuery(CHECK_CONTACT_UNIQUE_NAME);

  async function check(data: FormValues) {
    if (
      type === "form-edit" &&
      data.firstName === contactDetail?.first_name &&
      data.lastName === contactDetail.last_name
    ) {
    }

    const resp = await checkUniqueName({
      variables: {
        where: {
          _and: [
            { first_name: { _eq: data.firstName } },
            { last_name: { _eq: data.lastName } },
          ],
        },
      },
    });

    if (!resp.data?.contact.length) return true;

    if (contactDetail && resp.data.contact[0].id === contactDetail.id) {
      return true;
    }

    const err: ErrorOption = {
      type: "manual",
      message: "Name already exist",
    };
    setError("firstName", err);
    setError("lastName", err);
    return false;
  }

  return check;
}
