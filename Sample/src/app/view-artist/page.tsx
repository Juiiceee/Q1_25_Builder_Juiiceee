"use client";
import { Program, AnchorProvider, setProvider } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import idl from "@/../anchor/target/idl/hello_anchor.json";
import { hello_anchor as anchorProgram } from "@/../anchor/target/types/hello_anchor";
import { useState } from "react";
import { getStyleName } from "@/utils/styleUtils";

export default function ViewArtist() {
	const [data, setData] = useState<any>(null);
	const wallet = useAnchorWallet();
	const { connection } = useConnection();
	if (!wallet) return null;
	const provider = new AnchorProvider(connection, wallet, {
		commitment: "confirmed",
	});
	setProvider(provider);
	const program = new Program(idl as anchorProgram, provider);
	const View = async () => {
		const data = await program.account.musician.all();
		console.log(data);
		setData(data);
	}
	
	return (
		<div className="p-4 max-w-md mx-auto bg-neutral-900 rounded-md">
			<h1 className="text-2xl font-bold text-center mb-4">Artist Registration</h1>
			<div className="flex flex-col gap-y-4">
				<button onClick={View}>View Artist</button>
				{data && data.map((item, index) => (
					<div key={index} className="flex flex-col gap-y-2 border-2 p-2">
						<p>Name: {item.account.name}</p>
						<p>Type: {getStyleName(item.account.style)}</p>
						<p>PublicKey: {item.publicKey.toString()}</p>
					</div>
				))}
			</div>
		</div>
	)
}