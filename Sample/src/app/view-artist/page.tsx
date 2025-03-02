"use client";
import { Program, AnchorProvider, setProvider } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import idl from "@/../anchor/target/idl/hello_anchor.json";
import { HelloAnchor as anchorProgram } from "@/../anchor/target/types/hello_anchor";
import { useEffect, useState } from "react";
import { getStyleName } from "@/utils/styleUtils";

export default function ViewArtist() {
	const [data, setData] = useState<any>(null);
	const wallet = useAnchorWallet();
	const { connection } = useConnection();

	useEffect(() => {
		if (!wallet) return;

		const provider = new AnchorProvider(connection, wallet, {
			commitment: "confirmed",
		});
		setProvider(provider);
		const program = new Program(idl as anchorProgram, provider);

		// Fonction asynchrone pour récupérer les données
		const fetchData = async () => {
			try {
				const musicianData = await program.account.musician.all();
				console.log(musicianData);
				setData(musicianData);
			} catch (error) {
				console.error("Error fetching musicians:", error);
			}
		};

		// Appel de la fonction asynchrone
		fetchData();
	}, [wallet, connection]); // Dépendances correctes

	return (
		<div className="p-4 max-w-md mx-auto bg-neutral-900 rounded-md">
			<h1 className="text-2xl font-bold text-center mb-4">Artist List</h1>

			{!wallet ? (
				<p className="text-white text-center">Please connect your wallet to view artists</p>
			) : (
				<div className="flex flex-col gap-y-4">
					{data ? (
						data.length > 0 ? (
							data.map((item: any, index: any) => (
								<div key={index} className="flex flex-col gap-y-2 border-2 p-2">
									<p>Name: {item.account.name}</p>
									<p>Type: {getStyleName(item.account.style)}</p>
									<p>PublicKey: {item.publicKey.toString()}</p>
								</div>
							))
						) : (
							<p className="text-white text-center">No artists found</p>
						)
					) : (
						<p className="text-white text-center">Loading artists...</p>
					)}
				</div>
			)}
		</div>
	)
}