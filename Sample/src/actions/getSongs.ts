import { Song } from "@/types"

const getSongs = async (): Promise<Song[]> => {
	//   const supabase = createServerComponentClient({
	//     cookies: cookies,
	//   })

	//   const { data, error } = await supabase.from("songs").select("*").order("created_at", { ascending: false })

	//   if (error) {
	//     console.log(17, "getSongs error - ", error.message)
	//   }

	//   return (data as any) || []
	const data = [
		{
			id: "1",
			user_id: "123",
			author: "Author1",
			title: "salut",
			song_path: "/gazo.mp3",
			image_path: "/solanaIconRondFr.png"
		},
		{
			id: "2",
			user_id: "456",
			author: "Author2",
			title: "feur",
			song_path: "/path/to/song2",
			image_path: "/path/to/image2"
		}
	]

	return (data as any) || []
}

export default getSongs
