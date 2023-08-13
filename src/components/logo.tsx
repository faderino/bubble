import theme from "@/styles/theme";
import { Cloud } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      css={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
    >
      <Cloud color={theme.colors.indigo} />
      <h3>bubble</h3>
    </Link>
  );
}
