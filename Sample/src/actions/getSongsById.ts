import { Song } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const getSongsById = async (): Promise<Song[]> => {
//   const supabase = createServerComponentClient({
//     cookies: cookies,
//   })
//   const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

//   if (sessionError) {
//     console.log(12, "session error in getSongsById - ", sessionError.message)
//     return []
//   }

//   const { data, error } = await supabase
//     .from("songs")
//     .select("*")
//     .eq("user_id", sessionData.session?.user.id)
//     .order("created_at", { ascending: false })

//   if (error) {
//     console.log(23, "getSongsById error - ", error.message)
//   }
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

export default getSongsById
