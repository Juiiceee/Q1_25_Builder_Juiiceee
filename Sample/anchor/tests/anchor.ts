import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { HelloAnchor as Anchor } from "../target/types/hello_anchor";
import { PublicKey, Keypair } from "@solana/web3.js";
import { expect } from "chai";

describe("Juiiceee Music Program", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.HelloAnchor as Program<Anchor>;
  const signer = provider.wallet;

  it("Can initialize a musician", async () => {
    const name = "Test Musician";
    const musicianKeypair = anchor.web3.Keypair.generate();
    
    const [musicianPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("musician"), Buffer.from(name), signer.publicKey.toBuffer()],
      program.programId
    );

    try {
      const tx = await program.methods
        .initializeMusician(
          name,
          { rock: {} } // Style enum
        )
        .accountsStrict({
          musician: musicianPda,
          signer: signer.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      // Fetch the created musician account
      const musicianAccount = await program.account.musician.fetch(musicianPda);
      
      expect(musicianAccount.name).to.equal(name);
      expect(musicianAccount.musicAmount).to.equal(0);
      console.log("Created musician:", musicianAccount);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  });

  it("Can add music to a musician", async () => {
    const musicianName = "Test Musician";
    const musicName = "Test Song";
    
    // Derive musician PDA
    const [musicianPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("musician"), Buffer.from(musicianName), signer.publicKey.toBuffer()],
      program.programId
    );

    // Derive music PDA
    const [musicPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("music"), Buffer.from(musicName), musicianPda.toBuffer()],
      program.programId
    );

    try {
      const tx = await program.methods
        .addMusic(
          musicName,
          signer.publicKey,
          { rock: {} }, // Style enum corrigé
          new anchor.BN(1000000), // price in lamports
          "https://example.com/cover.jpg",
          "https://example.com/song.mp3"
        )
        .accountsStrict({
          music: musicPda,
          musician: musicianPda,
          signer: signer.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      // Fetch the created music account
      const musicAccount = await program.account.music.fetch(musicPda);
      
      expect(musicAccount.name).to.equal(musicName);
      expect(musicAccount.price.toNumber()).to.equal(1000000);

      // Verify musician's music count increased
      const musicianAccount = await program.account.musician.fetch(musicianPda);
      expect(musicianAccount.musicAmount).to.equal(1);
      
      console.log("Added music:", musicAccount);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  });
});
