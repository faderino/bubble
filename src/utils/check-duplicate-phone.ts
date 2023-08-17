import { FormValues } from "@/components/form-contact/form-contact";
import { UseFormSetError } from "react-hook-form";

export function checkDuplicatePhones(
  phones: { number: string }[],
  setError: UseFormSetError<FormValues>
): boolean {
  const freq: Record<string, number> = phones.reduce((prev, curr) => {
    if (!prev[curr.number]) {
      prev[curr.number] = 0;
    }
    prev[curr.number]++;
    return prev;
  }, {} as Record<string, number>);

  let hasDuplicatePhone = false;
  phones.forEach((phone, index) => {
    if (freq[phone.number] > 1) {
      hasDuplicatePhone = true;
      setError(`phones.${index}.number`, {
        type: "manual",
        message: "Duplicate phone number",
      });
    }
  });

  return hasDuplicatePhone;
}
