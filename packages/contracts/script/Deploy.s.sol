// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

import "forge-std/Script.sol";
import "../src/Drops.sol";

contract Deploy is Script {
    Drops public drops;

    function run() public {
        string memory file = "packages/snapshots/drops/1/addresses.txt";
        string memory addressList = vm.readFile(file);
        vm.setEnv("DROP_TO", addressList);
        address[] memory dropTo = vm.envAddress("DROP_TO", "\n");

        string memory chainId = vm.envString("CHAIN_ID");

        vm.startBroadcast();

        drops = new Drops(
            0x27676d628ab0979754F01aF51074680DfA38D3e9, // mint.samkingstudio.eth
            msg.sender,
            0xAa6BF8F3A77F9A71A778204E3f4049a416DbB72a // signer.samkingstudio.eth
        );

        drops.setDropURI(1, "ipfs://QmXSQQYww8BRLiD9obXwfZTa3pP7uJWcgE8o7YnzLDcNde");
        drops.drop(1, dropTo);

        string memory deployJson = string.concat(
            '{"address": "',
            vm.toString(address(drops)),
            '", "blockNumber": ',
            vm.toString(block.number),
            "}"
        );

        vm.writeFile(
            string.concat("packages/contracts/deploys/drops.", chainId, ".json"),
            deployJson
        );

        vm.stopBroadcast();
    }
}
