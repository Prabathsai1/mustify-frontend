import axiosinstance from '../components/api/axios.jsx'
import { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

function Music() {
  const [music, setMusic] = useState([])
  const [songlink, setSonglink] = useState(null)
  const [loadingId, setLoadingId] = useState(null)

  const reference = useRef(null)
  const autoplay = useRef(0)
  const timerreset = useRef(null)

  const musicarray = music
    .map((data) => data?.music?.[0]?.[1])
    .filter(Boolean)

  function playlist(song, index) {
    const audio = reference.current?.audio?.current

    if (timerreset.current === song && audio) {
      audio.currentTime = 0
    }

    setSonglink(song)
    autoplay.current = index
    timerreset.current = song
  }

  function nextsong() {
    if (musicarray.length === 0) return

    autoplay.current = (autoplay.current + 1) % musicarray.length
    setSonglink(musicarray[autoplay.current])
  }

  function previousSong() {
    if (musicarray.length === 0) return

    autoplay.current =
      (autoplay.current - 1 + musicarray.length) % musicarray.length

    setSonglink(musicarray[autoplay.current])
  }

  async function acceptSong(id) {
    setLoadingId(id)
    try {
      const response = await axiosinstance.post("/spotify/home/music/admin", { "pending": "Approved", id })
      toast.success(response.data.message)
      setMusic(prev => prev.filter(item => item._id !== id))
      
        
    } catch (error) {
      console.log(error.response)
    } finally {
      setLoadingId(null)
    }
  }

  async function rejectSong(id) {
   
    try {
      const response = await axiosinstance.post("/spotify/home/music/admin", { "pending": "Reject", id })
      setMusic(prev => prev.filter(item => item._id !== id))
      toast.error(response.data.message)
    } catch (error) {
      console.log(error.response)
    } finally {
      setLoadingId(null)
    }
  }

  useEffect(() => {
    async function fetchMusic() {
      try {
        const response = await axiosinstance.post("/admin/data")

        const cleaned = response.data.Data.map(item => ({
          ...item,
          musicname: item.musicname?.[0],
          status: item.status?.[0],
        }))

        setMusic(cleaned)
      } catch (error) {
        console.log(error.response)
      }
    }
    fetchMusic()
  }, [])

  return (
    <>
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          verification pending songs {music.length}
        </li>

        <div className="flex flex-col overflow-scroll h-[700px]">
          {music.map((data, index) => {
            const song = data?.music?.[0]?.[1]

            return (
              <div key={data._id}>
                <li
                  className={`list-row border mb-2 ${autoplay.current === index
                      ? "bg-green-500/20"
                      : ""
                    }`}
                >
                  <div>
                    <img
                      className="size-10 rounded-box"
                      src={data?.music?.[0]?.[0]}
                      alt="song"
                    />
                  </div>

                  <div>
                    <div>{data.musicname}</div>

                    <div className="text-xs uppercase font-semibold opacity-80">
                      {data.artistDetails[0].UserName}
                    </div>

                    <div className="text-xs font-semibold">
                      Status: {data.status}
                    </div>
                  </div>

                  <button
                    onClick={() => playlist(song, index)}
                    className="btn btn-square btn-ghost"
                  >
                    ▶
                  </button>
                  <div className="flex gap-2 ml-auto">
                    <button
                      onClick={() => acceptSong(data._id)}
                      className="btn btn-success btn-sm"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => rejectSong(data._id)}
                      className="btn btn-error btn-sm"
                    >
                      Reject
                    </button>
                  </div>
                </li>
              </div>
            )
          })}
        </div>
      </ul>

      <AudioPlayer
        className="dark-player sticky bottom-0 mt-10 rounded-xl overflow-hidden"
        autoPlay
        ref={reference}
        src={songlink}
        onEnded={nextsong}
        showSkipControls={true}
        showJumpControls={true}
        onClickPrevious={previousSong}
        onClickNext={nextsong}
      />
    </>
  )
}

export default Music