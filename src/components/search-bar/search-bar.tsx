import { Search } from "lucide-react";
import styles from "./search-bar.styles";
import { FormEvent, useEffect, useRef, useState } from "react";
import useAutoFocus from "@/hooks/use-auto-focus";

interface SearchBarProps {
  close?: () => void;
}

export default function SearchBar({ close }: SearchBarProps) {
  const inputRef = useAutoFocus();
  const [search, setSearch] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} css={styles.searchBar}>
      <input
        ref={inputRef}
        placeholder="Search contacts"
        onBlur={close}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Search />
    </form>
  );
}
