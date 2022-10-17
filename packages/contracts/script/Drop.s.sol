// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

import "forge-std/Script.sol";

interface IDrops {
    function drop(uint256 dropId, address[] calldata recipients) external;

    function drop(
        uint256 dropId,
        address[] calldata recipients,
        uint256 amount
    ) external;

    function drop(
        uint256 dropId,
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external;

    function studioMint(
        uint256 dropId,
        address to,
        uint256 amount
    ) external;
}

contract Drop is Script {
    function run() public {
        // Mainnet address
        address dropsContract = 0x208D1008fA508414B6DC63738Bc8560A12Ef5279;
        uint256 dropId = 1;

        // Populate address list however you want
        address[] memory dropTo = new address[](1);
        // dropTo[0] = 0xD633d5bc9Fd1250aC203dE798508340dFA989B6B;

        vm.startBroadcast();
        IDrops(dropsContract).drop(dropId, dropTo);
        vm.stopBroadcast();
    }
}
