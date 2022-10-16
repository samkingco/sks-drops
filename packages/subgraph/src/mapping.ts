import {
  ExampleNFT,
  Initialized,
  Transfer as TransferEvent,
} from "../generated/ExampleNFT/ExampleNFT";
import { Settings, Token, Wallet } from "../generated/schema";

export function handleInit(event: Initialized): void {
  const contract = ExampleNFT.bind(event.address);
  let settings = Settings.load("ExampleNFT:settings");
  if (!settings) {
    settings = new Settings("ExampleNFT:settings");
    settings.price = contract.PRICE();
    settings.save();
  }
}

export function handleTransfer(event: TransferEvent): void {
  const contract = ExampleNFT.bind(event.address);

  const id = event.params.id;
  const fromAddress = event.params.from;
  const toAddress = event.params.to;

  let fromWallet = Wallet.load(fromAddress.toHexString());
  if (!fromWallet) {
    fromWallet = new Wallet(fromAddress.toHexString());
    fromWallet.address = fromAddress;
    fromWallet.save();
  }

  let toWallet = Wallet.load(toAddress.toHexString());
  if (!toWallet) {
    toWallet = new Wallet(toAddress.toHexString());
    toWallet.address = toAddress;
    toWallet.save();
  }

  let token = Token.load(id.toString());
  if (!token) {
    token = new Token(id.toString());
    token.tokenURI = contract.tokenURI(id);
  }
  token.owner = toWallet.id;
  token.save();
}
