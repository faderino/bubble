import { defaultErrorMessage } from "@/error";
import { CHECK_CONTACT_UNIQUE_NAME } from "@/graphql/queries";
import theme from "@/styles/theme";
import { useLazyQuery } from "@apollo/client";
import { Phone, Plus, User2, X } from "lucide-react";
import {
    ErrorOption,
    SubmitHandler,
    useFieldArray,
    useForm,
} from "react-hook-form";
import { toast } from "react-hot-toast";
import { Button } from "../ui/button";
import { Form, FormItem, FormItemGroup } from "../ui/form/form";
import { Input } from "../ui/input";

export const FORM_CONTACT_ID = "contact-form";
const NO_SPECIAL_CHARACTERS_VALIDATION = {
  pattern: {
    value: /^[A-Za-z0-9]+$/i,
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
}

export default function FormContact({ handleSave }: FormContactProps) {
  const { register, handleSubmit, control, watch, formState, setError } =
    useForm<FormValues>({
      defaultValues: {
        firstName: "",
        lastName: "",
        phones: [{ number: "" }],
      },
    });
  const [checkUniqueName] = useLazyQuery(CHECK_CONTACT_UNIQUE_NAME);

  const { fields, append, remove } = useFieldArray({ name: "phones", control });
  const watchLastPhone = watch(`phones.${fields.length - 1}.number`);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
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
      if (resp.data?.contact.length) {
        const err: ErrorOption = {
          type: "manual",
          message: "Name already exist",
        };
        setError("firstName", err);
        setError("lastName", err);
        return;
      }
    } catch (error) {
      toast.error(defaultErrorMessage);
      return;
    }

    handleSave(data);
  };

  function PhoneInputButton(index: number) {
    if (index === fields.length - 1) {
      if (!watchLastPhone) return null;

      return (
        <Button
          onClick={() => append({ number: "" })}
          type="button"
          css={{ width: "1.5rem", height: "1.5rem", padding: 0 }}
          variant="ghost"
        >
          <Plus color={theme.colors.indigo} size="1rem" />
        </Button>
      );
    }

    return (
      <Button
        onClick={() => remove(index)}
        type="button"
        css={{ width: "1.5rem", height: "1.5rem", padding: 0 }}
        variant="ghost"
      >
        <X color={theme.colors.textSecondary} size="1rem" />
      </Button>
    );
  }

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
          />
        </FormItem>
        <FormItem error={formState.errors.lastName?.message}>
          <Input
            placeholder="Last name"
            {...register("lastName", {
              required: "Last name is required",
              ...NO_SPECIAL_CHARACTERS_VALIDATION,
            })}
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
              append={PhoneInputButton(index)}
              error={formState.errors.phones?.[index]?.number?.message}
            >
              <Input
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
                  validate: (field) => {
                    if (fields.some((f) => f.number === field)) {
                      return "Duplicate phone number";
                    }
                    return true;
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
