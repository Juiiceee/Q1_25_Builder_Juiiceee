import './globals.css'
import { Figtree } from "next/font/google"
import Sidebar from "../components/Sidebar"
import ToasterProvider from "@/providers/ToasterProvider"
import getSongsByUserId from "@/actions/getSongsByUserId"
import Player from "@/components/Player"
import { ClusterProvider } from '@/components/cluster/cluster-data-access'
import { SolanaProvider } from '@/components/solana/solana-provider'
import { ReactQueryProvider } from './react-query-provider'
import { WalletButton } from '../components/solana/solana-provider'

export const metadata = {
	title: 'Sample',
	description: 'Generated by create-solana-dapp',
}

interface LayoutProps {
	children: React.ReactNode
}

export default async function RootLayout({ children }: LayoutProps) {
	const userSongs = await getSongsByUserId();
	return (
		<html lang="en">
			<body>
				<ReactQueryProvider>
					<ClusterProvider>
						<SolanaProvider>
							<ToasterProvider />
							<Sidebar songs={userSongs}>
								<div className="bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
									<div className="relative flex-1 bg-neutral-900 p-4 overflow-y-auto">
										<div className="absolute top-4 right-4 z-10">
											<WalletButton />
										</div>
										{children}
									</div>
								</div>
							</Sidebar>
							<Player />
						</SolanaProvider>
					</ClusterProvider>
				</ReactQueryProvider>
			</body>
		</html>
	)
}
