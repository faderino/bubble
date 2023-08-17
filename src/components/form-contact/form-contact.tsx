import { useCheckUniqueName } from "@/hooks/use-check-unique-name";
import theme from "@/styles/theme";
import { Contact } from "@/types";
import { checkDuplicatePhones } from "@/utils/check-duplicate-phone";
import { Phone, User2 } from "lucide-react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Form, FormItem, FormItemGroup } from "../ui/form/form";
import { Input } from "../ui/input";
import PhoneInputButton from "./phone-input-button";

export const FORM_CONTACT_ID = "contact-form";
const NO_SPECIAL_CHARACTERS_VALIDATION = {
  pattern: {
    value: /^[ A-Za-z0-9]+$/i,
    message: "Special characters not allowed",
  },
};

export interface FormValues {
  firstName: string;
  lastName: string;
  phones: { number: string }[];
}

interface FormContactProps {
  handleSave: (data: FormValues) => void;
  contactDetail?: Contact | null;
  type?: "form-add" | "form-edit" | "display";
}

export default function FormContact({
  handleSave,
  contactDetail,
  type = "form-add",
}: FormContactProps) {
  const { register, handleSubmit, control, watch, formState, setError } =
    useForm<FormValues>({
      defaultValues: {
        firstName: contactDetail?.first_name ?? "",
        lastName: contactDetail?.last_name ?? "",
        phones: contactDetail?.phones ?? [{ number: "" }],
      },
    });
  const checkUniqueName = useCheckUniqueName(type, setError, contactDetail);

  const { fields, append, remove } = useFieldArray({ name: "phones", control });
  const watchLastPhone = watch(`phones.${fields.length - 1}.number`);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const filterEmptyPhones = data.phones.filter((phone) => phone.number);

    if (checkDuplicatePhones(filterEmptyPhones, setError)) return;
    const nameIsUnique = await checkUniqueName(data);
    if (!nameIsUnique) return;

    handleSave({ ...data, phones: filterEmptyPhones });
  };

  return (
    <Form
      id={FORM_CONTACT_ID}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      css={{ paddingTop: "2rem", maxWidth: "500px", margin: "0 auto" }}
    >
      <FormItemGroup>
        <FormItem
          prepend={<User2 color={theme.colors.textSecondary} />}
          error={formState.errors.firstName?.message}
        >
          <Input
            placeholder="First name"
            {...register("firstName", {
              required: "First name is required",
              ...NO_SPECIAL_CHARACTERS_VALIDATION,
            })}
            displayOnly={type === "display"}
          />
        </FormItem>
        <FormItem error={formState.errors.lastName?.message}>
          <Input
            placeholder="Last name"
            {...register("lastName", {
              required: "Last name is required",
              ...NO_SPECIAL_CHARACTERS_VALIDATION,
            })}
            displayOnly={type === "display"}
          />
        </FormItem>
      </FormItemGroup>

      <FormItemGroup>
        {fields.map((field, index) => {
          return (
            <FormItem
              key={field.id}
              prepend={
                index === 0 ? (
                  <Phone color={theme.colors.textSecondary} />
                ) : null
              }
              append={
                <PhoneInputButton
                  append={append}
                  fields={fields}
                  index={index}
                  remove={remove}
                  type={type}
                  watchLastPhone={watchLastPhone}
                  contactDetail={contactDetail}
                />
              }
              error={formState.errors.phones?.[index]?.number?.message}
            >
              <Input
                displayOnly={type === "display"}
                placeholder="Phone"
                {...register(`phones.${index}.number`, {
                  required: {
                    value: index === 0 || index < fields.length - 1,
                    message: "Phone number cannot be empty",
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: "Invalid phone number",
                  },
                })}
              />
            </FormItem>
          );
        })}
      </FormItemGroup>
    </Form>
  );
}
