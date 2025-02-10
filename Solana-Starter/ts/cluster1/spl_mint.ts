import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../wba-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("D9L6PDr7SSGWddChqwR3HUJ4bh4VVDhVfUK6bDi6feAM");

const tokenAccount = new PublicKey("AKzgQsbQSU6eJzvem9NXXswLvgkiSX4AUsnDcDTkjKTH");



(async () => {
    try {
    // const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
    // console.log(`Token account address: ${tokenAccount.address.toBase58()}`);
    const hash = await mintTo(connection, keypair, mint, tokenAccount, keypair.publicKey, 100);
    console.log(`Transaction hash: ${hash}`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
