"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"
import { getAssetPath } from "@/utils/paths"

export default function MusicPlayer({ musicPlaying, setMusicPlaying }) {
  const audioRef = useRef(null)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)

  useEffect(() => {
    if (audioRef.current) {
      // Set volume to 50%
      audioRef.current.volume = 0.5;
      if (musicPlaying) {
        audioRef.current.play().catch(console.error)
      } else {
        audioRef.current.pause()
      }
    }
  }, [musicPlaying])

  // Start music on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasUserInteracted && audioRef.current && musicPlaying) {
        audioRef.current.play().catch(console.error)
        setHasUserInteracted(true)
      }
    }

    // Listen for any user interaction
    document.addEventListener('click', handleFirstInteraction)
    document.addEventListener('touchstart', handleFirstInteraction)
    document.addEventListener('keydown', handleFirstInteraction)

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
    }
  }, [musicPlaying, hasUserInteracted])

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed top-4 right-4 z-50"
    >
      <motion.button
        onClick={toggleMusic}
        className="bg-pink-500/20 backdrop-blur-sm border border-pink-300/30 rounded-full p-3 text-pink-200 hover:bg-pink-500/30 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {musicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </motion.button>

      {/* Background music audio */}
      <audio ref={audioRef} loop preload="auto">
        <source src={getAssetPath("/audio/bg.mp3")} type="audio/mpeg" />
      </audio>
    </motion.div>
  )
}
