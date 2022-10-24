import addresses from "@sks-drops/snapshots/drops/1/addresses.json";
import { BigNumber } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
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

  const balance: BigNumber = await contract.balanceOf(address, 1);
  if (balance.toString() !== "0") {
    return res.status(400).json({
      name: "Already owned",
      message: "Looks like you already own this drop",
      code: "ALREADY_OWNED",
    });
  }

  if (!addresses.map((i) => i.toLowerCase()).includes(address.toLowerCase())) {
    return res.status(400).json({
      name: "Address not in snapshot",
      message: "Please connect with a wallet address from the snapshot",
      code: "NOT_AVAILABLE_FOR_ADDRESS",
    });
  }

  switch (req.method) {
    case "POST":
      const signature = await createSignature(
        BigNumber.from(1),
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
