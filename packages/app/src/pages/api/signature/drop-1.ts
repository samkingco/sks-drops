import addresses from "@sks-drops/snapshots/drops/1/addresses.json";
import { BigNumber, ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import { drops, targetChainId } from "../../../utils/contracts";
import { ResponseError } from "../../../utils/fetch";

const chainId = targetChainId;

// EIP-712 domain config
const domain = {
  // Name and version must match contract variables
  name: "SamKingStudioDrops",
  version: "1",
  verifyingContract: drops.address,
  chainId,
};

// Signer private key setup
const signerKey = process.env.DROPS_SIGNER_PRIV_KEY;
if (!signerKey) throw new Error("No DROPS_SIGNER_PRIV_KEY set in .env");

// Create a provider, can be any RPC based provider, we use the RPC URL from .env
const provider = new ethers.providers.AlchemyProvider(chainId);

// Create a signer from a private key. The signers public key must be added to the contract.
const signer = new ethers.Wallet(signerKey, provider);

// Create a contract instance to read state from (used to grab the claimers latest nonce)
const contract = new ethers.Contract(drops.address, drops.abi, provider);

// Create a signature from the required data
async function createSignature(
  dropId: BigNumber,
  amount: BigNumber,
  to: string
) {
  // The signed data type to get hashed
  const types = {
    ClaimDropData: [
      { name: "dropId", type: "uint256" },
      { name: "amount", type: "uint256" },
      { name: "to", type: "address" },
      { name: "nonce", type: "uint256" },
    ],
  };

  // Get the current nonce from the contract
  const nonce: BigNumber = await contract.nonces(to);

  // Create the data to  be hashed
  const data = {
    dropId,
    amount,
    to,
    nonce,
  };

  // Generate the signature from the typed data using ethers.js
  const signature = await signer._signTypedData(domain, types, data);

  return signature;
}

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
