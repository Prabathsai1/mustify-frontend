import axiosinstance from '../components/api/axios.jsx'
import { useState, useEffect, useRef } from 'react'
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css'

function Music() {
  const [music, setMusic] = useState([])
  const [songlink, setSonglink] = useState(null)
  const [image,setimage]=useState(null)

  const reference = useRef(null)
  const autoplay = useRef(0)
  const timerreset = useRef(null)

  const musicarray = music
    .map((r) => r?.music?.[0]?.[1])
    .filter(Boolean)
 
  const musicImage = music.map((r) => r.music[0][0])
  
  function playlist(song, index,img) {
    const audio = reference.current?.audio?.current
    setimage(img)
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
    setimage(musicImage[autoplay.current])
    setSonglink(musicarray[autoplay.current])
  }

  function previousSong() {
    if (musicarray.length === 0) return
      
     
      autoplay.current =
        (autoplay.current - 1 + musicarray.length) % musicarray.length
    
    setimage(musicImage[autoplay.current])
    setSonglink(musicarray[autoplay.current])
  }

useEffect(() => {
  if (songlink) {
    localStorage.setItem("song", songlink);
  }
  if (image) {
    localStorage.setItem("image", image);
  }
}, [image,songlink]);
  
  
  useEffect(() => {
    const savedSong = localStorage.getItem("song");
    const savedimage=localStorage.getItem("image")
  if (savedSong) {
    setSonglink(savedSong);
    }
    if (savedimage) { 
      setimage(savedimage)
    }
}, []);


  useEffect(() => {
    async function fetchMusic() {
      try {
        const response = await axiosinstance.post("/spotify/home/music")
        setMusic(response.data)
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
          Most played songs
        </li>

        <div className="flex flex-col overflow-scroll h-[700px]">
          {music.map((data, index) => {
            const song = data?.music?.[0]?.[1]

            return (
              <div key={data._id}>
                <li
                  className={`list-row border mb-2 ${
                    autoplay.current === index
                      ? "bg-green-500/20"
                      : ""
                  }`}
                >
                  <div>
                    <img
                      className="size-10 rounded-box"
                      src={data?.music?.[0]?.[0]}
                    />
                  </div>

                  <div>
                    <div>{data.musicname}</div>
                    <div className="text-xs uppercase font-semibold opacity-80">
                      {data.artistDetails[0].UserName}
                    </div>
                  </div>

                  <button
                    onClick={() => playlist(song, index,data?.music?.[0]?.[0])}
                    className="btn btn-square btn-ghost"
                  >
                    ▶
                  </button>
                </li>
              </div>
            )
          })}
        </div>
      </ul>
      <div className="flex items-center sticky bottom-0 mt-10 max-sm:flex-col max-sm:items-center max-sm:gap-2 px-2">
  
        {image && <img
    className="h-25 max-w-xs rounded-box"
    src={image}
    alt="song"
  />}

  <AudioPlayer
    className="dark-player rounded-xl overflow-hidden w-full"
    autoPlay
    ref={reference}
    src={songlink}
    onEnded={nextsong}
    showSkipControls={true}
    showJumpControls={true}
    onClickPrevious={previousSong}
    onClickNext={nextsong}
  />

</div>
    </>
  )
}

export default Music
