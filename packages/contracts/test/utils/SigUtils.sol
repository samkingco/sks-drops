// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

import {ECDSA} from "openzeppelin/utils/cryptography/ECDSA.sol";

contract SigUtils {
    bytes32 public hashedName;
    bytes32 public hashedVersion;
    address public verifiedContract;

    constructor(
        string memory signingDomain,
        string memory signatureVersion,
        address verifiedContract_
    ) {
        hashedName = keccak256(bytes(signingDomain));
        hashedVersion = keccak256(bytes(signatureVersion));
        verifiedContract = verifiedContract_;
    }

    // computes the hash of the fully encoded EIP-712 message for the domain, which can be used to recover the signer
    function getTypedDataHash(bytes32 structHash) public view returns (bytes32) {
        bytes32 typeHash = keccak256(
            "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
        );

        bytes32 domainSeparator = keccak256(
            abi.encode(typeHash, hashedName, hashedVersion, block.chainid, verifiedContract)
        );

        return ECDSA.toTypedDataHash(domainSeparator, structHash);
    }
}
