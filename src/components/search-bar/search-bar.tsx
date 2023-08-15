import useAutoFocus from "@/hooks/use-auto-focus";
import { Search } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import styles from "./search-bar.styles";
import { useRouter } from "next/router";

interface SearchBarProps {
  close?: () => void;
}

export default function SearchBar({ close }: SearchBarProps) {
  const router = useRouter();
  const inputRef = useAutoFocus();
  const searchParams = router.query as { q: string };
  const [search, setSearch] = useState<string>(searchParams.q || "");

  useEffect(() => {
    setSearch(searchParams.q || "");
  }, [searchParams.q]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(search ? `/search?q=${search}` : "/");
  }

  return (
    <form onSubmit={handleSubmit} css={styles.searchBar}>
      <input
        ref={inputRef}
        placeholder="Search contacts"
        onBlur={close}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <Search />
    </form>
  );
}
