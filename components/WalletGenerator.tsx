"use client";
import React, { useEffect, useState } from "react";
import { mnemonicToSeed, generateMnemonic, validateMnemonic, mnemonicToSeedSync } from "bip39";
import axios from "axios";

interface Wallet {
  public_key: string;
  private_key: string;
  mnemonic: string;
  path: string;
}
const WalletGenerator = () => {
  const pathNamesTypes: { [key: string]: string } = {
    "501": "Solana",
    "60": "Ethereum",
  };
  const [mnemonicWords, SetMnemonicWords] = useState<string[]>(
    Array(12).fill(" ")
  );
  const [pathNames, setPathNames] = useState<string[]>([]);
  const [mnemonicInput, SetMnemonicInput] = useState<string>("");
  const [wallets, setWallets] = useState<Wallet[]>([]);

  const generateWallet = () => {
    let mnemonic = mnemonicInput.trim();

    if (mnemonic) {
      if (!validateMnemonic(mnemonic)) {
        <div>Secret Phase is not that Secret</div>;
      } else {
        mnemonic = generateMnemonic();
      }
    }
    let words = mnemonic.split(" ");
    SetMnemonicWords(words);

    const wallet = generateWalletfromMnemonic(
      pathNames[0],
      mnemonicWords.join(" "),
      wallets.length
    );
  };
  const generateWalletfromMnemonic = (
    pathType: string,
    mnemonic: string,
    accountCount: number
  ) => {
        try {
            const seedBuffer = mnemonicToSeedSync(mnemonic);
            const path = `m/44'/${pathType}'/0'/${accountCount}'`;
            
        } catch (error) {
            
        }
  };
  return (
    <div className="min-h-screen max-w-dvw">
      <div>Generate Wallet , choose the blockchain to start </div>
      <button onClick={() => setPathNames(["501"])}>Solana</button>
      <button onClick={() => setPathNames(["60"])}>Ethereum</button>

      {pathNames.length != 0 && (
        <div>
          <h1 className="font-mono">Generate Secret Phrase </h1>
          <input
            type="text"
            placeholder="Add your Secret phrase or leave blank to generate"
            onChange={(e) => SetMnemonicInput(e.target.value)}
            value={mnemonicInput}
          />
          <button onClick={generateWallet}>Generate Wallet</button>
        </div>
      )}
    </div>
  );
};

export default WalletGenerator;
