import fs from "fs";
import { dropOneWallets } from "./drop-1";

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function main(dropNum: number) {
  let wallets: string[] = [];

  if (dropNum == 1) {
    wallets = dropOneWallets;
  }

  const outputPath = `drops/${dropNum}`;
  ensureDir(outputPath);

  fs.writeFileSync(`${outputPath}/addresses.txt`, wallets.join("\n"));
  fs.writeFileSync(`${outputPath}/addresses.json`, JSON.stringify(wallets));
}

main(1)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
