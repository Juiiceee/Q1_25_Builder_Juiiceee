"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Input from "./Input";
import Button from "./Button";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { initMusic } from "./Operation";
import idl from "@/../anchor/target/idl/hello_anchor.json";
import { HelloAnchor as anchorProgram } from "@/../anchor/target/types/hello_anchor";
import { AnchorProvider, Program, setProvider } from "@coral-xyz/anchor";
import { filterByArtistKey} from "@/utils/styleUtils";
import { PublicKey } from "@solana/web3.js";

export default function MusicRegistration() {
	const wallet = useAnchorWallet();
	const { connection } = useConnection();
	const [name, setName] = useState("");
	const [style, setStyle] = useState("");
	const [price, setPrice] = useState(0);
	const [urlCover, setUrlCover] = useState("");
	const [urlSong, setUrlSong] = useState("");
	if (!wallet) return;

	const provider = new AnchorProvider(connection, wallet, {
			commitment: "confirmed",
	});
	setProvider(provider);
	const program = new Program(idl as anchorProgram, provider);

	const isFormValid = () => {
		return !!(
			name &&
			style &&
			price > 0 &&
			urlCover &&
			urlSong
		);
	};

	const print = async () => {
		try {
			const [musicianPda] = PublicKey.findProgramAddressSync(
				[Buffer.from("musician"), wallet.publicKey.toBuffer()],
				program.programId
			);
			const musicianData = await program.account.music.all();
			const filter = filterByArtistKey(musicianData, musicianPda.toString());
			console.log(filter.forEach((item) => console.log(item.account.name)));
		} catch (error) {
			console.error("Error fetching musicians:", error);
		}
	}

	return (
		<div className="p-4 max-w-md mx-auto bg-neutral-900 rounded-md">
			<h1 className="text-2xl font-bold text-center mb-4 text-white">Music Registration</h1>
			<div className="flex flex-col gap-y-4">
				<div>
					<label htmlFor="name" className="text-white">Name:</label>
					<Input
						id="name"
						placeholder="Music Name"
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="mainType" className="text-white">Musical Style:</label>
					<select
						id="mainType"
						className="form-select w-full mt-1 p-2 rounded-md bg-neutral-700 text-white"
						onChange={(e) => setStyle(e.target.value)}
					>
						<option value="rock">Rock</option>
						<option value="rap">Rap</option>
						<option value="classique">Classique</option>
						<option value="electro">Electro</option>
						<option value="jazz">Jazz</option>
					</select>
				</div>
				<div>
					<label htmlFor="price" className="text-white">Price:</label>
					<Input
						id="price"
						type="number"
						placeholder="Price"
						onChange={(e) => setPrice(Number(e.target.value))}
					/>
				</div>
				<div>
					<div className="pb-1 text-white">Select a song file</div>
					<Input
						placeholder="Select a song file"
						type="text"
						id="song"
						onChange={(e) => setUrlSong(e.target.value)}
					/>
				</div>
				<div>
					<div className="pb-1 text-white">Select an image</div>
					<Input
						placeholder="Select an image"
						type="text"
						id="image"
						onChange={(e) => setUrlCover(e.target.value)}
					/>
				</div>
				<Button disabled={!isFormValid()} onClick={async () => await initMusic(name, style, price, urlCover, urlSong, wallet, connection)}>Register</Button>
				<button onClick={print}>print</button>
			</div>
		</div>
	);
};