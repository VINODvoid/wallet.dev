"use client";
import React, { useEffect, useState } from "react";
import {  generateMnemonic, validateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import axios from "axios";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { ethers } from "ethers";
import { Mnemonic } from "ethers";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { log } from "console";

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

    if(mnemonic && !validateMnemonic(mnemonic))
    {
      alert("Secret Phase is not that Secret");
      return;
    }
    else if(!mnemonic)
    {
      mnemonic = generateMnemonic();
    }


    // if (mnemonic) {
    //   if (!validateMnemonic(mnemonic)) {
    //     <div>Secret Phase is not that Secret</div>;
    //   } else {
    //     mnemonic = generateMnemonic();
    //   }
    // }
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
  ) :Wallet | null=> {
        try {
            const seedBuffer = mnemonicToSeedSync(mnemonic);
            const path = `m/44'/${pathType}'/0'/${accountCount}'`;
            const {key:derivedSeed} = derivePath(path,seedBuffer.toString("hex"));

            let publicKeyEncoded:string| undefined;
            let privateKeyEncoded:string | undefined;
            if(pathType === "501")
            {
              const {secretKey} = nacl.sign.keyPair.fromSeed(derivedSeed);
              const  keypair = Keypair.fromSecretKey(secretKey);

              privateKeyEncoded = bs58.encode(secretKey);
              publicKeyEncoded = keypair.publicKey.toBase58();
            }
            else if (pathType === "60")
            {
              const privateKey= Buffer.from(derivedSeed).toString("hex");
              privateKeyEncoded = privateKey;


              const wallet = new ethers.Wallet(privateKey);

              publicKeyEncoded = wallet.address;
            }
          else{
            alert("Error in creating Wallet")
          }
          if(!publicKeyEncoded || !privateKeyEncoded)
          {
            alert("No creation")
            return null;
          }
          return {
            public_key:publicKeyEncoded,
            private_key:privateKeyEncoded,
            mnemonic:mnemonic,
            path:path
            
          };
        } catch (error) {

          alert("Error in trycatch")
            return null;
        }
  };
  
  return (
    <div className="h-[90dvh] max-w-screen">
        <p>Generate Wallet , choose the blockchain to start </p>
      <div className="flex p-4 m-4 justify-center">

      <Button onClick={() => setPathNames(["501"])} className="m-4 hover:bg-slate-100" variant={"outline"}>Solana</Button>
      <Button onClick={() => setPathNames(["60"])} variant={"outline"} className="m-4 hover:bg-slate-100">Ethereum</Button>
</div>
      {pathNames.length != 0 && (
        <div>
          <h1 className="font-mono">Generate Secret Phrase </h1>
          <Input
            type="text"
            placeholder="Add your Secret phrase or leave blank to generate"
            onChange={(e) => SetMnemonicInput(e.target.value)}
            value={mnemonicInput}
          />
          <Button onClick={generateWallet} className="" variant={"secondary"}>Generate Wallet</Button>
        </div>
      )}
      {
        mnemonicWords && (
          <div className="">
            {mnemonicWords.join(" ")}

          </div>
        )
      }

      
      
    </div>
  );
};

export default WalletGenerator;
