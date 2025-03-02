"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Input from "./Input";
import Button from "./Button";
import { Program, AnchorProvider, setProvider } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import idl from "@/../anchor/target/idl/hello_anchor.json";
import { HelloAnchor as anchorProgram } from "@/../anchor/target/types/hello_anchor";

interface FormValues {
	isArtist: boolean;
	mainName: string;
	mainType: string;
}

export const ArtistRegistrationForm: React.FC<ArtistRegistrationFormProps> = () => {
	const wallet = useAnchorWallet();
	const { connection } = useConnection();
	const [name, setName] = useState("");
	const [type, setType] = useState("");

	const isFilled = name !== "" && type !== "";

	const test = () => {
		console.log("test");
	}
	if (!wallet) return null;
	const provider = new AnchorProvider(connection, wallet, {
		commitment: "confirmed",
	});
	setProvider(provider);
	const program = new Program(idl as anchorProgram, provider);

	const [musicianPda] = PublicKey.findProgramAddressSync(
		[Buffer.from("musician"), Buffer.from(name), wallet.publicKey.toBuffer()],
		program.programId
	);

	const initMusic = async () => {
		const transaction = await program.methods
			.initializeMusician(name, { [type]: {}})
			.accountsStrict({
				musician: musicianPda,
				signer: wallet.publicKey,
				systemProgram: SystemProgram.programId,
			})
			.rpc();
		console.log(`Transaction signature: ${transaction}`);

	}

	return (
		<div className="p-4 max-w-md mx-auto bg-neutral-900 rounded-md">
			<h1 className="text-2xl font-bold text-center mb-4">Artist Registration</h1>
			<div className="flex flex-col gap-y-4">
				<div>
					<label htmlFor="mainName" className="text-white">Main name:</label>
					<Input
						id="mainName"
						placeholder="Michael Jackson"
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="mainType" className="text-white">Musical Style:</label>
					<select
						id="mainType"
						className="form-select w-full mt-1 p-2 rounded-md bg-neutral-700 text-white"
						onChange={(e) => setType(e.target.value)}
					>
						<option value="Rock">Rock</option>
						<option value="Rap">Rap</option>
						<option value="Classique">Classique</option>
						<option value="Electro">Electro</option>
						<option value="Jazz">Jazz</option>
					</select>
				</div>
				<Button onClick={initMusic} disabled={!isFilled}>Enregistrer</Button>
				<Button onClick={View}>Voir</Button>
			</div>
		</div>
	);
};

export default ArtistRegistrationForm;