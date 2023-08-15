import { Menu, Search } from "lucide-react";
import { useState } from "react";
import Logo from "../logo";
import SearchBar from "../search-bar/search-bar";
import { Button } from "../ui/button";
import styles from "./header.styles";
import sharedStyles from "@/styles/shared.styles";

interface HeaderProps {}

export default function Header({}: HeaderProps) {
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <div css={[styles.header, sharedStyles.container]}>
      <div css={styles.headerContent}>
        <div css={styles.headerLogo}>
          <Logo />
        </div>

        <div css={styles.searchContainer}>
          <div css={styles.searchBarToggle}>
            {showSearchBar ? (
              <SearchBar close={() => setShowSearchBar(false)} />
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSearchBar(true)}
              >
                <Search />
              </Button>
            )}
          </div>

          <div css={styles.searchBarAlways}>
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
}
