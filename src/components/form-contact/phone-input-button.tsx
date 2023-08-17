import { UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form";
import { FormValues } from "./form-contact";
import { Button } from "../ui/button";
import { Plus, X } from "lucide-react";
import theme from "@/styles/theme";
import { Contact } from "@/types";

interface PhoneInputButtonProps {
  index: number;
  type: "form-add" | "form-edit" | "display";
  fields: FormValues["phones"];
  watchLastPhone: string;
  append: UseFieldArrayAppend<FormValues, "phones">;
  remove: UseFieldArrayRemove;
  contactDetail?: Contact | null;
}

export default function PhoneInputButton({
  index,
  type,
  fields,
  watchLastPhone,
  append,
  remove,
  contactDetail,
}: PhoneInputButtonProps) {
  if (type === "display") return null;

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

  if (type === "form-edit" && contactDetail) {
    if (index > contactDetail.phones.length - 1) {
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

    return null;
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
