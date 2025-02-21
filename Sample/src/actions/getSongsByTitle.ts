import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies, headers } from "next/headers"

import { Song } from "@/types"

import getSongs from "./getSongs"

const getSongsByTitle = async (title: string): Promise<Song[]> => {
//   const supabase = createServerComponentClient({
//     cookies: cookies,
//   })

//   if (!title) {
//     const allSongs = await getSongs()
//     return allSongs
//   }

//   const { data, error } = await supabase
//     .from("songs")
//     .select("*")
//     .ilike("title", `%${title}%`)
//     .order("created_at", { ascending: false })

//   if (error) {
//     console.log(25, "error - ", error.message)
//   }

//   return (data as any) || []
const data = [
	{
		id: "1",
		user_id: "123",
		author: "Author1",
		title: "salut",
		song_path: "/path/to/song1",
		image_path: "/path/to/image1"
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

export default getSongsByTitle
