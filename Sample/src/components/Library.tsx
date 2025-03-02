import { TbPlaylist } from "react-icons/tb"
import { AiOutlinePlus } from "react-icons/ai"
import useUploadModal from "@/hooks/useUploadModal"
import { Song } from "@/types"
import MediaItem from "./MediaItem"
import useOnPlay from "@/hooks/useOnPlay"
import { useRouter } from "next/navigation"
import { PublicKey } from "@solana/web3.js";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { AnchorProvider, Program, setProvider } from "@coral-xyz/anchor";
import idl from "@/../anchor/target/idl/hello_anchor.json";
import { HelloAnchor as anchorProgram } from "@/../anchor/target/types/hello_anchor";
import { filterByArtistKey } from "@/utils/styleUtils";
import { useEffect } from "react"

interface LibraryProps {
	songs: Song[]
}

const Library = ({ songs }: LibraryProps) => {
	// const wallet = useAnchorWallet();
	// const { connection } = useConnection();
	// if (!wallet) return [];

	// const provider = new AnchorProvider(connection, wallet, {
	// 	commitment: "confirmed",
	// });
	// setProvider(provider);
	// const program = new Program(idl as anchorProgram, provider);
	// const fetchMusicData = async () => {
	// 	try {
	// 		const provider = new AnchorProvider(connection, wallet, {
	// 			commitment: "confirmed",
	// 		});
	// 		setProvider(provider);
	// 		const program = new Program(idl as anchorProgram, provider);

	// 		const [musicianPda] = PublicKey.findProgramAddressSync(
	// 			[Buffer.from("musician"), wallet.publicKey.toBuffer()],
	// 			program.programId
	// 		);
	// 		const musicianData = await program.account.music.all();
	// 		const filter = filterByArtistKey(musicianData, musicianPda.toString());
	// 		console.log(filter.forEach((item) => console.log(item.account.name)));
	// 	} catch (error) {
	// 		console.error("Error fetching musicians:", error);
	// 	}
	// };
	const router = useRouter()

	const onClick = () => {
		router.push("/register-music")
	}

	return (
		<div className="flex flex-col ">
			<div className="flex items-center justify-between px-5 py-4">
				<div className="inline-flex items-center gap-2">
					<TbPlaylist className="text-neutral-400" size={26} />
					<p className="text-neutral-400 font-medium text-md">Your libray</p>
				</div>
				<AiOutlinePlus
					className="text-neutral-400 cursor-pointer hover:text-white transition"
					onClick={onClick}
					size={20}
				/>
			</div>
			<div className="flex flex-col gap-y-2 mt-4 px-3">
				{/* {songs.map(song => (
					// <MediaItem onClick={(id: string) => onPlay(id)} key={song.id} data={song} />
				))} */}
			</div>
		</div>
	)
}

export default Library
