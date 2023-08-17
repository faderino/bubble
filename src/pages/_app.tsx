import Layout from "@/components/layout";
import { FavoriteContactsProvider } from "@/context/favorite-contacts-context";
import client from "@/graphql/client";
import { globalStyles } from "@/styles/global.styles";
import theme from "@/styles/theme";
import { ApolloProvider } from "@apollo/client";
import { Global } from "@emotion/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyles} />
      <ApolloProvider client={client}>
        <FavoriteContactsProvider>
          <Layout>
            <Toaster
              position="bottom-center"
              toastOptions={{
                style: {
                  background: theme.colors.textPrimary,
                  color: theme.colors.white,
                  fontSize: theme.fontSize.sm,
                  lineHeight: theme.lineHeight.sm,
                  textAlign: "center",
                },
              }}
            />
            <Component {...pageProps} />
          </Layout>
        </FavoriteContactsProvider>
      </ApolloProvider>
    </>
  );
}
