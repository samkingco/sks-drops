import { BigNumber } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import { DROP_2 } from "../../../utils/drops";
import { contract, createSignature } from "../../../utils/eip712-signature";
import { ResponseError } from "../../../utils/fetch";

interface Data {
  signature: string;
}

export default async function dropOne(
  req: NextApiRequest,
  res: NextApiResponse<Data | ResponseError>
) {
  const address = req.body.address as string;

  if (!address) {
    return res.status(400).json({
      name: "No wallet address",
      message: "Please supply a wallet address",
      code: "NO_ADDRESS",
    });
  }

  const balance: BigNumber = await contract.balanceOf(address, DROP_2.id);
  if (balance.toString() !== "0") {
    return res.status(400).json({
      name: "Already owned",
      message: "Looks like you already own this drop",
      code: "ALREADY_OWNED",
    });
  }

  const now = Date.now();

  if (now < DROP_2.startsAt * 1000) {
    return res.status(400).json({
      name: "Drop not active",
      message: `Drop starts at ${DROP_2.startsAt}`,
      code: "NOT_AVAILABLE_YET",
    });
  }

  if (now > DROP_2.endsAt * 1000) {
    return res.status(400).json({
      name: "Drop expired",
      message: `Drop ended at ${DROP_2.endsAt}`,
      code: "NOT_AVAILABLE_ANYMORE",
    });
  }

  switch (req.method) {
    case "POST":
      const signature = await createSignature(
        BigNumber.from(DROP_2.id),
        BigNumber.from(1),
        address
      );
      res.status(200).json({ signature });
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
