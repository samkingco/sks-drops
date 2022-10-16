# Expects jq to be installed

source .env

if [ -z "$CHAIN_ID" ]; then
  echo "CHAIN_ID is not set"
  exit 1
fi

METADATA_DEPLOY_OUTPUT="deploys/$CHAIN_ID/ExampleNFT.json"
NFT_DEPLOY_OUTPUT="deploys/$CHAIN_ID/Metadata.json"
mkdir -p $(dirname $METADATA_DEPLOY_OUTPUT)
mkdir -p $(dirname $NFT_DEPLOY_OUTPUT)

forge script script/Deploy.s.sol:Deploy --optimizer-runs 200 --use 0.8.17 --ffi -vvv \
    --chain-id $CHAIN_ID \
    --rpc-url $RPC_URL \
    --private-key $DEPLOYER_PRIVATE_KEY \
    --broadcast \
    --verify --etherscan-api-key $ETHERSCAN_API_KEY

jq '{deployedTo: .receipts[0].contractAddress, deployer: .receipts[0].tx.from, transactionHash: .receipts[0].transactionHash}' ./broadcast/Deploy.s.sol/$CHAIN_ID/run-latest.json > $METADATA_DEPLOY_OUTPUT

jq '{deployedTo: .receipts[1].contractAddress, deployer: .receipts[1].tx.from, transactionHash: .receipts[1].transactionHash}' ./broadcast/Deploy.s.sol/$CHAIN_ID/run-latest.json > $NFT_DEPLOY_OUTPUT