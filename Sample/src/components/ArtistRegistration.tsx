"use client";

import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { initMusician } from "./Operation";

export default function ArtistRegistration() {
	const [name, setName] = useState("");
	const [type, setType] = useState("");
	const wallet = useAnchorWallet();
	const { connection } = useConnection();
	const isFilled = name !== "" && type !== "";

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
						<option value="rock">Rock</option>
						<option value="rap">Rap</option>
						<option value="classique">Classique</option>
						<option value="electro">Electro</option>
						<option value="jazz">Jazz</option>
					</select>
				</div>
				<Button onClick={async () => await initMusician(name, type, wallet, connection)} disabled={!isFilled}>Enregistrer</Button>
			</div>
		</div>
	);
};