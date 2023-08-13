import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_API,
  documents: ["src/**/*.tsx"],
  generates: {
    "./src/graphql/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
