import Layout from "@/components/layout";
import { FavoriteContactsProvider } from "@/context/favorite-contacts-context";
import client from "@/graphql/client";
import { globalStyles } from "@/styles/global.styles";
import { ApolloProvider } from "@apollo/client";
import { Global } from "@emotion/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyles} />
      <ApolloProvider client={client}>
        <FavoriteContactsProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </FavoriteContactsProvider>
      </ApolloProvider>
    </>
  );
}
