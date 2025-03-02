"use client";

import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { AnchorProvider, Program, setProvider } from "@coral-xyz/anchor";
import idl from "@/../anchor/target/idl/hello_anchor.json";
import { HelloAnchor as anchorProgram } from "@/../anchor/target/types/hello_anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { getTxTron } from "@/utils/styleUtils";

export const initMusic = async (name: string, type: string, wallet: any, connection: any) => {
	if (!wallet) {
		toast.error("Please connect your wallet");
		return;
	}

	try {
		const provider = new AnchorProvider(connection, wallet, {
			commitment: "confirmed",
		});
		setProvider(provider);

		const program = new Program(idl as anchorProgram, provider);

		const [musicianPda] = PublicKey.findProgramAddressSync(
			[Buffer.from("musician"), Buffer.from(name), wallet.publicKey.toBuffer()],
			program.programId
		);

		// Appeler l'instruction InitializeMusician
		const tx = await program.methods
			.initializeMusician(name, { [type]: {} })
			.accountsStrict({
				musician: musicianPda,
				signer: wallet.publicKey,
				systemProgram: SystemProgram.programId,
			})
			.rpc();

		console.log(`Transaction signature: ${tx}`);
		toast.success(`Artist registered successfully!: ${getTxTron(tx)}`);
	} catch (error: any) {
		console.error("Error initializing musician:", error);
		toast.error(`Failed to register artist: ${error.message}`);
	}
};