import { ApolloClient, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          contact: offsetLimitPagination(),
        },
      },
    },
  }),
});

export default client;
