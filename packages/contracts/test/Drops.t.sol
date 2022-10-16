// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "solmate/tokens/ERC20.sol";
import "openzeppelin/utils/Strings.sol";
import "../src/Drops.sol";
import "../src/IMetadata.sol";
import "./utils/SigUtils.sol";

contract CustomMetadata is IMetadata {
    using Strings for uint256;

    constructor() {}

    function uri(uint256 id) public pure returns (string memory) {
        return string.concat("ipfs://<customMetadata>/", id.toString());
    }
}

contract DropsTest is Test {
    Drops private drops;
    SigUtils public sigutils;

    address private owner = makeAddr("owner");
    address private admin = makeAddr("admin");
    address private claimer = makeAddr("claimer");

    uint256 private signerPrivKey = 0xABCD;
    address private signer = vm.addr(signerPrivKey);

    uint256 private invalidSignerPrivKey = 0xBEEF;
    address private invalidSigner = vm.addr(invalidSignerPrivKey);

    function setUp() public {
        drops = new Drops(owner, admin, signer);
        sigutils = new SigUtils("SamKingStudioDrops", "1", address(drops));
        vm.deal(owner, 10 ether);
    }

    function testTokenInfo() public {
        assertEq(drops.name(), "Drops from Sam King Studio");
        assertEq(drops.symbol(), "SKSDRP");
    }

    function getRecipients(uint256 amount) public returns (address[] memory) {
        address[] memory recipients = new address[](amount);
        for (uint256 i = 0; i < recipients.length; i++) {
            recipients[i] = makeAddr(string.concat("recipient_", vm.toString(i)));
        }
        return recipients;
    }

    function testSetupDrop() public {
        vm.startPrank(owner);
        drops.setDropURI(1, "ipfs://<baseHash>/1");
        assertEq(drops.dropURI(1), "ipfs://<baseHash>/1");

        CustomMetadata metadata = new CustomMetadata();
        drops.setDropMetadataAddress(2, address(metadata));
        assertEq(drops.dropMetadataAddress(2), address(metadata));
    }

    function testUri() public {
        CustomMetadata metadata = new CustomMetadata();

        vm.startPrank(owner);
        drops.setDropURI(1, "ipfs://<baseHash>/1");
        drops.setDropMetadataAddress(2, address(metadata));
        drops.setDropURI(3, "ipfs://<baseHash>/3");

        assertEq(drops.uri(1), "ipfs://<baseHash>/1");
        assertEq(drops.uri(2), "ipfs://<customMetadata>/2");
        assertEq(drops.uri(3), "ipfs://<baseHash>/3");

        drops.setDropMetadataAddress(3, address(metadata));
        assertEq(drops.uri(3), "ipfs://<customMetadata>/3");
    }

    function testCannotSetupDropUnlessOwner() public {
        vm.expectRevert("UNAUTHORIZED");
        drops.setDropURI(1, "ipfs://<baseHash>/1");
    }

    function testDrop() public {
        address[] memory recipients = getRecipients(100);

        for (uint256 i = 0; i < recipients.length; i++) {
            assertEq(drops.balanceOf(recipients[i], 1), 0);
        }

        vm.startPrank(owner);
        drops.setDropURI(1, "ipfs://<baseHash>/1");
        drops.drop(1, recipients);

        for (uint256 i = 0; i < recipients.length; i++) {
            assertEq(drops.balanceOf(recipients[i], 1), 1);
        }
    }

    function testDropWithAmount() public {
        uint256 amount = 5;
        address[] memory recipients = getRecipients(100);

        for (uint256 i = 0; i < recipients.length; i++) {
            assertEq(drops.balanceOf(recipients[i], 1), 0);
        }

        vm.startPrank(owner);
        drops.setDropURI(1, "ipfs://<baseHash>/1");
        drops.drop(1, recipients, amount);

        for (uint256 i = 0; i < recipients.length; i++) {
            assertEq(drops.balanceOf(recipients[i], 1), amount);
        }
    }

    function testDropWithAmountPerRecipient() public {
        uint256[] memory amounts = new uint256[](100);
        address[] memory recipients = getRecipients(100);

        for (uint256 i = 0; i < recipients.length; i++) {
            amounts[i] = i + 1;
            assertEq(drops.balanceOf(recipients[i], 1), 0);
        }

        vm.startPrank(owner);
        drops.setDropURI(1, "ipfs://<baseHash>/1");
        drops.drop(1, recipients, amounts);

        for (uint256 i = 0; i < recipients.length; i++) {
            assertEq(drops.balanceOf(recipients[i], 1), amounts[i]);
        }
    }

    function testCannotDropUnlessReady() public {
        address[] memory recipients = getRecipients(100);

        vm.startPrank(owner);

        vm.expectRevert("DROP_NOT_READY");
        drops.drop(1, recipients);

        vm.expectRevert("DROP_NOT_READY");
        drops.drop(2, recipients, 5);

        uint256[] memory amounts = new uint256[](recipients.length);
        for (uint256 i = 0; i < recipients.length; i++) {
            amounts[i] = i + 1;
        }
        vm.expectRevert("DROP_NOT_READY");
        drops.drop(2, recipients, amounts);
    }

    function testShouldNotMintWhenDropWithAmountIsZero() public {
        uint256 amount = 0;
        address[] memory recipients = getRecipients(100);

        for (uint256 i = 0; i < recipients.length; i++) {
            assertEq(drops.balanceOf(recipients[i], 1), 0);
        }

        vm.startPrank(owner);
        drops.setDropURI(1, "ipfs://<baseHash>/1");
        drops.drop(1, recipients, amount);

        for (uint256 i = 0; i < recipients.length; i++) {
            assertEq(drops.balanceOf(recipients[i], 1), 0);
        }
    }

    function testShouldNotMintWhenDropWithAmountPerRecipientIsZero() public {
        uint256[] memory amounts = new uint256[](100);
        address[] memory recipients = getRecipients(100);

        for (uint256 i = 0; i < recipients.length; i++) {
            amounts[i] = i;
            assertEq(drops.balanceOf(recipients[i], 1), 0);
        }

        vm.startPrank(owner);
        drops.setDropURI(1, "ipfs://<baseHash>/1");
        drops.drop(1, recipients, amounts);

        for (uint256 i = 0; i < recipients.length; i++) {
            assertEq(drops.balanceOf(recipients[i], 1), amounts[i]);
        }
    }

    function testCannotDropWithAmountPerRecipientIfLengthMistmatch() public {
        uint256[] memory amounts = new uint256[](10);
        address[] memory recipients = getRecipients(100);

        for (uint256 i = 0; i < amounts.length; i++) {
            amounts[i] = i + 1;
        }

        for (uint256 i = 0; i < recipients.length; i++) {
            assertEq(drops.balanceOf(recipients[i], 1), 0);
        }

        vm.startPrank(owner);
        drops.setDropURI(1, "ipfs://<baseHash>/1");

        vm.expectRevert("LENGTH_MISMATCH");
        drops.drop(1, recipients, amounts);
    }

    function testCannotDropUnlessOwner() public {
        address[] memory recipients = getRecipients(100);

        vm.prank(owner);
        drops.setDropURI(1, "ipfs://<baseHash>/1");

        vm.expectRevert("UNAUTHORIZED");
        drops.drop(1, recipients);
    }

    function testStudioMint() public {
        address to = owner;
        assertEq(drops.balanceOf(to, 1), 0);

        vm.startPrank(owner);
        drops.setDropURI(1, "ipfs://<baseHash>/1");
        drops.studioMint(1, to, 10);

        assertEq(drops.balanceOf(to, 1), 10);
    }

    function testStudioMintFuzz(address to, uint256 amount) public {
        if (to == address(0)) to = address(0xBEEF);
        if (uint256(uint160(to)) <= 18 || to.code.length > 0) return;

        assertEq(drops.balanceOf(to, 1), 0);

        vm.startPrank(owner);
        drops.setDropURI(1, "ipfs://<baseHash>/1");
        drops.studioMint(1, to, amount);

        assertEq(drops.balanceOf(to, 1), amount);
    }

    function testCannotAddApprovedSignerWhenNotOwner() public {
        vm.expectRevert("UNAUTHORIZED");
        drops.addSigner(vm.addr(0xBEEF));
    }

    function testCannotRemoveApprovedSignerWhenNotOwner() public {
        vm.expectRevert("UNAUTHORIZED");
        drops.removeSigner(signer);
    }

    function testClaimDrop() public {
        vm.prank(owner);
        drops.setDropURI(1, "ipfs://<baseHash>/1");

        uint256 dropId = 1;
        uint256 amount = 5;

        // Get signed typed data
        Drops.ClaimDropData memory data = getSignature(
            signerPrivKey,
            dropId,
            amount,
            claimer,
            drops.nonces(claimer)
        );

        assertEq(drops.balanceOf(claimer, dropId), 0);

        vm.prank(claimer);
        drops.claimDrop(dropId, amount, data.signature);
        assertEq(drops.balanceOf(claimer, dropId), amount);

        // Increment the nonce for a new signature
        Drops.ClaimDropData memory nextData = getSignature(
            signerPrivKey,
            dropId,
            amount,
            claimer,
            data.nonce + 1
        );

        // Issue again with new nonce and confirm balance has doubled
        vm.prank(claimer);
        drops.claimDrop(dropId, amount, nextData.signature);
        assertEq(drops.balanceOf(claimer, dropId), amount * 2);
    }

    function testCannotClaimDropUnlessReady() public {
        uint256 dropId = 1;
        uint256 amount = 5;

        // Get signed typed data
        Drops.ClaimDropData memory data = getSignature(
            signerPrivKey,
            dropId,
            amount,
            claimer,
            drops.nonces(claimer)
        );

        assertEq(drops.balanceOf(claimer, dropId), 0);

        vm.prank(claimer);
        vm.expectRevert("DROP_NOT_READY");
        drops.claimDrop(dropId, amount, data.signature);

        assertEq(drops.balanceOf(claimer, dropId), 0);
    }

    function testCannotClaimDropWithInvalidSigner() public {
        vm.prank(owner);
        drops.setDropURI(1, "ipfs://<baseHash>/1");

        uint256 dropId = 1;
        uint256 amount = 5;

        // Get signed typed data
        Drops.ClaimDropData memory data = getSignature(
            invalidSignerPrivKey,
            dropId,
            amount,
            claimer,
            drops.nonces(claimer)
        );

        assertEq(drops.balanceOf(claimer, dropId), 0);

        vm.prank(claimer);
        vm.expectRevert("INVALID_SIGNATURE");
        drops.claimDrop(dropId, amount, data.signature);
        assertEq(drops.balanceOf(claimer, dropId), 0);
    }

    function testCannotClaimDropWithReusedSignature() public {
        vm.prank(owner);
        drops.setDropURI(1, "ipfs://<baseHash>/1");

        uint256 dropId = 1;
        uint256 amount = 5;

        // Get signed typed data
        Drops.ClaimDropData memory data = getSignature(
            signerPrivKey,
            dropId,
            amount,
            claimer,
            drops.nonces(claimer)
        );

        assertEq(drops.balanceOf(claimer, dropId), 0);

        vm.prank(claimer);
        drops.claimDrop(dropId, amount, data.signature);
        assertEq(drops.balanceOf(claimer, dropId), amount);

        vm.prank(claimer);
        vm.expectRevert("INVALID_SIGNATURE");
        drops.claimDrop(dropId, amount, data.signature);
        assertEq(drops.balanceOf(claimer, dropId), amount);
    }

    function testCannotClaimDropWithDifferentDropId() public {
        vm.prank(owner);
        drops.setDropURI(1, "ipfs://<baseHash>/1");
        vm.prank(owner);
        drops.setDropURI(2, "ipfs://<baseHash>/2");

        uint256 dropId = 1;
        uint256 attemptedDropId = 2;
        uint256 amount = 5;

        // Get signed typed data
        Drops.ClaimDropData memory data = getSignature(
            signerPrivKey,
            dropId,
            amount,
            claimer,
            drops.nonces(claimer)
        );

        assertEq(drops.balanceOf(claimer, dropId), 0);
        assertEq(drops.balanceOf(claimer, attemptedDropId), 0);

        vm.prank(claimer);
        vm.expectRevert("INVALID_SIGNATURE");
        drops.claimDrop(attemptedDropId, amount, data.signature);
        assertEq(drops.balanceOf(claimer, dropId), 0);
        assertEq(drops.balanceOf(claimer, attemptedDropId), 0);
    }

    function testCannotClaimDropWithDifferentAmount() public {
        vm.prank(owner);
        drops.setDropURI(1, "ipfs://<baseHash>/1");

        uint256 dropId = 1;
        uint256 amount = 5;

        // Get signed typed data
        Drops.ClaimDropData memory data = getSignature(
            signerPrivKey,
            dropId,
            amount,
            claimer,
            drops.nonces(claimer)
        );

        assertEq(drops.balanceOf(claimer, dropId), 0);

        vm.prank(claimer);
        vm.expectRevert("INVALID_SIGNATURE");
        drops.claimDrop(dropId, amount * 2, data.signature);
        assertEq(drops.balanceOf(claimer, dropId), 0);
    }

    function testCannotClaimDropWhenNotIntededRecipient() public {
        vm.prank(owner);
        drops.setDropURI(1, "ipfs://<baseHash>/1");

        uint256 dropId = 1;
        uint256 amount = 5;

        // Get signed typed data
        Drops.ClaimDropData memory data = getSignature(
            signerPrivKey,
            dropId,
            amount,
            claimer,
            drops.nonces(claimer)
        );

        assertEq(drops.balanceOf(claimer, dropId), 0);
        assertEq(drops.balanceOf(msg.sender, dropId), 0);

        vm.expectRevert("INVALID_SIGNATURE");
        drops.claimDrop(dropId, amount, data.signature);
        assertEq(drops.balanceOf(claimer, dropId), 0);
        assertEq(drops.balanceOf(msg.sender, dropId), 0);
    }

    function getSignature(
        uint256 privateKey,
        uint256 dropId_,
        uint256 amount_,
        address to_,
        uint256 nonce_
    ) internal returns (Drops.ClaimDropData memory) {
        Drops.ClaimDropData memory data = Drops.ClaimDropData(dropId_, amount_, to_, nonce_, "");

        // Generate EIP-712 signature for the typed data
        bytes32 digest = sigutils.getTypedDataHash(
            keccak256(
                abi.encode(
                    drops.CLAIM_DROP_TYPEHASH(),
                    data.dropId,
                    data.amount,
                    data.to,
                    data.nonce
                )
            )
        );

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, digest);
        data.signature = abi.encodePacked(r, s, v);
        return data;
    }
}
