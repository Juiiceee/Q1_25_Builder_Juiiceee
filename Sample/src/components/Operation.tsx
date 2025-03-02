"use client";

import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { AnchorProvider, Program, setProvider, BN } from "@coral-xyz/anchor";
import idl from "@/../anchor/target/idl/hello_anchor.json";
import { HelloAnchor as anchorProgram } from "@/../anchor/target/types/hello_anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { getTxTron } from "@/utils/styleUtils";

export const initMusician = async (name: string, style: string, wallet: any, connection: any) => {
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
			[Buffer.from("musician"), wallet.publicKey.toBuffer()],
			program.programId
		);

		// Appeler l'instruction InitializeMusician
		const tx = await program.methods
			.initializeMusician(name, { [style]: {} })
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

export const initMusic = async (name: string, style: string, price: number, urlCover: string, urlSong: string, wallet: any, connection: any) => {
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
			[Buffer.from("musician"), wallet.publicKey.toBuffer()],
			program.programId
		);

		const [musicPda] = PublicKey.findProgramAddressSync(
			[Buffer.from("music"), Buffer.from(name), musicianPda.toBuffer()],
			program.programId
		);

		const tx = await program.methods
			.addMusic(
				name,
				wallet.publicKey,
				{ [style]: {} }, // Style enum corrigé
				new BN(price), // price in lamports
				urlCover,
				urlSong
			)
			.accountsStrict({
				music: musicPda,
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
