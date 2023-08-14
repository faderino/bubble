import styles from "@/styles/shared.styles";
import { Inter } from "next/font/google";
import React from "react";
import Header from "./header/header";

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={inter.className} css={styles.container}>
      <Header />
      {children}
    </div>
  );
}
