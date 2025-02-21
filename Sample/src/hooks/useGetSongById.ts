import { useEffect, useMemo, useState } from "react"
import { toast } from "react-hot-toast"
import { useSessionContext } from "@supabase/auth-helpers-react"

import { Song } from "@/types"

const useSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [song, setSong] = useState<Song | undefined>(undefined)
//   const { supabaseClient } = useSessionContext()

  useEffect(() => {
    if (!id) {
      return
    }

    setIsLoading(true)

    const fetchSong = async () => {
    //   const { data, error } = await supabaseClient.from("songs").select("*").eq("id", id).single()

    //   if (error) {
    //     setIsLoading(false)
    //     return toast.error(error.message)
    //   }
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
      setSong(data as Song)
      setIsLoading(false)
    }

    fetchSong()
  }, [id])

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song],
  )
}

export default useSongById
