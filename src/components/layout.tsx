import sharedStyles from "@/styles/shared.styles";
import theme, { mediaQuery } from "@/styles/theme";
import { Plus, User2 } from "lucide-react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import React from "react";
import Header from "./header/header";
import { Button } from "./ui/button";
import styles from "./layout.styles";
import MenuItem from "./ui/menu-item";

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  return (
    <div className={inter.className} css={sharedStyles.container}>
      <Header />
      <div css={{ display: "flex" }}>
        <div css={styles.sidebar}>
          <div css={styles.sidebarContainer}>
            <div css={styles.createContactButtonContainer}>
              <Button
                variant="secondary"
                css={{ gap: "0.5rem" }}
                onClick={() => router.push("/add-contact")}
              >
                <Plus />
                Create contact
              </Button>
            </div>

            <MenuItem
              active={router.pathname === "/"}
              onClick={() => router.push("/")}
            >
              <User2 size="1.1rem" />
              Contacts
            </MenuItem>
          </div>
        </div>
        <div css={{ flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}
