import addresses from "@sks-drops/snapshots/drops/1/addresses.json";
import { initTRPC, TRPCError } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { BigNumber } from "ethers";
import { z } from "zod";
import { allDropIds, DROP_1, DROP_2 } from "../../../utils/drops";
import { contract, createSignature } from "../../../utils/eip712-signature";

const t = initTRPC.create();

const errorMessages: Record<string, string> = {
  INVALID_DROP: "Not a valid drop",
  NO_ADDRESS: "Please supply a wallet address",
  NOT_AVAILABLE_FOR_ADDRESS:
    "Sadly your wallet is not in the snapshot for this drop",
  NOT_AVAILABLE_YET: "Cannot claim yet",
  NOT_AVAILABLE_ANYMORE: "Drop is no longer available",
  ALREADY_OWNED: "You already own this drop",
  FALLBACK: "Unable to claim this drop",
} as const;

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

      switch (input.dropId) {
        case DROP_1.id:
          if (!balance.eq(0)) {
            throw new TRPCError({
              code: "PRECONDITION_FAILED",
              message: errorMessages.ALREADY_OWNED,
            });
          }
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
          if (!balance.eq(0)) {
            throw new TRPCError({
              code: "PRECONDITION_FAILED",
              message: errorMessages.ALREADY_OWNED,
            });
          }
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
