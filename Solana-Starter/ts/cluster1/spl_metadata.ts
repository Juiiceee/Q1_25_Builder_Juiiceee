import wallet from "../dev-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// Define our Mint address
const mint = publicKey("FMih8GuNiX1kYW5Ry9PsZKJ3S1pGrSRScP4q9522t7kx")

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {
        // Start here
        let accounts: CreateMetadataAccountV3InstructionAccounts = {
            mint,
            mintAuthority: signer
        }

        let data: DataV2Args = {
            name: "Juiceee",
            symbol: "JUS",
            uri: "https://arweave.net/123456",
            sellerFeeBasisPoints: 500,
            creators: [
                {
                    address: keypair.publicKey,
                    verified: true,
                    share: 100
                },
            ],
            collection: null,
            uses: null
        }

        let args: CreateMetadataAccountV3InstructionArgs = {
            data,
            isMutable: false,
            collectionDetails: null
        }

        let tx = createMetadataAccountV3(
            umi,
            {
                ...accounts,
                ...args
            }
        )

        let result = await tx.sendAndConfirm(umi);
        console.log("https://solscan.io/tx/" + bs58.encode(result.signature) + "?cluster=devnet");
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
