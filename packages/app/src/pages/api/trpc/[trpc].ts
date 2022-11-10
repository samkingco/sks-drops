import addresses from "@sks-drops/snapshots/drops/1/addresses.json";
import { initTRPC, TRPCError } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { BigNumber } from "ethers";
import { GraphQLClient } from "graphql-request";
import { z } from "zod";
import { graphql } from "../../../graphql";
import { allDropIds, DROP_1, DROP_2, DROP_3 } from "../../../utils/drops";
import { contract, createSignature } from "../../../utils/eip712-signature";

const t = initTRPC.create();

const errorMessages: Record<string, string> = {
  INVALID_DROP: "Not a valid drop",
  NO_ADDRESS: "Please supply a wallet address",
  NOT_AVAILABLE_FOR_ADDRESS:
    "Sadly your wallet is not in the snapshot for this drop",
  NOT_STUDIO_PROJECT_HOLDER: "Only available to holders of Roots and ICE64",
  NOT_AVAILABLE_YET: "Cannot claim yet",
  NOT_AVAILABLE_ANYMORE: "Drop is no longer available",
  ALREADY_OWNED: "You already own this drop",
  FALLBACK: "Unable to claim this drop",
} as const;

const graphQlClient = new GraphQLClient(
  "https://api.thegraph.com/subgraphs/name/samkingco/sks"
);

const ownershipQueryDocument = graphql(/* GraphQL */ `
  query Ownership {
    wallets {
      address
      roots {
        id
      }
      ice64Originals {
        id
      }
      ice64Editions {
        id
      }
    }
  }
`);

const appRouter = t.router({
  getSignatureForDrop: t.procedure
    .input(
      z.object({
        dropId: z.number(),
        claimQuantity: z.number().optional().default(1),
        address: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (!allDropIds.includes(input.dropId)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: errorMessages.INVALID_DROP,
        });
      }

      if (!input.address) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: errorMessages.NO_ADDRESS,
        });
      }

      const balance: BigNumber = await contract.balanceOf(
        input.address,
        input.dropId
      );

      if (!balance.eq(0)) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: errorMessages.ALREADY_OWNED,
        });
      }

      const previousProjectOwnership = await graphQlClient.request(
        ownershipQueryDocument
      );

      const currentHolders: string[] = [];
      for (const wallet of previousProjectOwnership.wallets) {
        if (
          wallet.roots.length > 0 ||
          wallet.ice64Originals.length > 0 ||
          wallet.ice64Editions.length > 0
        ) {
          currentHolders.push(wallet.address);
        }
      }

      switch (input.dropId) {
        case DROP_1.id:
          if (
            !addresses
              .map((i) => i.toLowerCase())
              .includes(input.address.toLowerCase())
          ) {
            throw new TRPCError({
              code: "PRECONDITION_FAILED",
              message: errorMessages.NOT_AVAILABLE_FOR_ADDRESS,
            });
          }
        case DROP_2.id:
          const now = Date.now();
          if (now < DROP_2.startsAt * 1000) {
            throw new TRPCError({
              code: "PRECONDITION_FAILED",
              message: errorMessages.NOT_AVAILABLE_YET,
            });
          }
          if (now > DROP_2.endsAt * 1000) {
            throw new TRPCError({
              code: "PRECONDITION_FAILED",
              message: errorMessages.NOT_AVAILABLE_ANYMORE,
            });
          }
        case DROP_3.id:
          if (!currentHolders.includes(input.address.toLowerCase())) {
            throw new TRPCError({
              code: "PRECONDITION_FAILED",
              message: errorMessages.NOT_STUDIO_PROJECT_HOLDER,
            });
          }
        default:
          break;
      }

      const signature = await createSignature(
        BigNumber.from(input.dropId),
        BigNumber.from(input.claimQuantity),
        input.address
      );

      return signature;
    }),
});

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
