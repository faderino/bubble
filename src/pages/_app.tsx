import Layout from "@/components/layout";
import client from "@/graphql/client";
import { globalStyles } from "@/styles/global.styles";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { Global } from "@emotion/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyles} />
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  );
}
