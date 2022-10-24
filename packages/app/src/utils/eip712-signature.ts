import { BigNumber, ethers } from "ethers";
import { drops, targetChainId } from "./contracts";

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
const provider = new ethers.providers.AlchemyProvider(
  chainId,
  process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
);

// Create a signer from a private key. The signers public key must be added to the contract.
const signer = new ethers.Wallet(signerKey, provider);

// Create a contract instance to read state from (used to grab the claimers latest nonce)
export const contract = new ethers.Contract(drops.address, drops.abi, provider);

// Create a signature from the required data
export async function createSignature(
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
