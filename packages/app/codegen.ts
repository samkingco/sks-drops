import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api.thegraph.com/subgraphs/name/samkingco/ice64",
  documents: "src/**/!(*.d).{ts,tsx}",
  generates: {
    "src/graphql": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
