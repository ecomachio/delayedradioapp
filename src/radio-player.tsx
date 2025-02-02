import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Play, Pause, Rewind, FastForward } from "lucide-react"
import Hls from 'hls.js';

export function RadioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pausedTime, setPausedTime] = useState<number>(0);
  const [pauseInterval, setPauseInterval] = useState<number | null>(null);
  const [delay, setDelay] = useState<number>(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setInterval(() => {
      console.log(audioRef.current?.currentTime);
    }, 500);

    // If hls.js is supported, use it to load the HLS stream.
    if (Hls.isSupported()) {
      const hls = new Hls();
      // This is your HLS playlist URL sample.
      // In a dynamic production environment, you might compute or fetch this URL.
      hls.loadSource('https://liverdgaupoa.rbsdirect.com.br/primary/gaucha_rbs.sdp/playlist.m3u8');
      hls.attachMedia(audio);

      // Cleanup on component unmount
      return () => {
        hls.destroy();
      };
    } else if (audio.canPlayType('application/vnd.apple.mpegurl')) {
      // Some browsers (e.g., Safari) support HLS natively.
      audio.src = 'https://liverdgaupoa.rbsdirect.com.br/primary/gaucha_rbs.sdp/playlist.m3u8';
    }
  }, []);

  const startPauseTimer = () => {
    const interval = window.setInterval(() => {
      setPausedTime(prev => prev + 1);
    }, 1000);
    setPauseInterval(interval);
  };

  const pausePauseTimer = () => {
    if (pauseInterval) {
      clearInterval(pauseInterval);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      startPauseTimer();
      audio.pause();
    } else {
      pausePauseTimer();
      audio.play().catch(error => {
        console.error('Error trying to play the audio:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleDelayChange = (value: number[]) => {
    const delay = value[0];
    setDelay(delay);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (pauseInterval) {
        clearInterval(pauseInterval);
      }
    };
  }, [pauseInterval]);

  const handler = (value: number[]) => {
    setDelay(value[0]);
    console.log(audioRef.current?.currentTime, audioRef.current?.duration);
    audioRef.current?.play();
    audioRef.current?.pause();
    if (audioRef.current) {
      audioRef.current.currentTime = 1;
    }
    setTimeout(() => {
      togglePlay();
    }, value[0] * 1000);
  }

  const goBack = (value: number) => {
    if (audioRef.current) {
      setDelay(prev => prev - value);
      audioRef.current.currentTime = audioRef.current.currentTime - value;
      console.log(audioRef.current.currentTime);
    }
  }

  const goForward = (value: number) => {
    if (audioRef.current) {
      setDelay(prev => prev - value);
      audioRef.current.currentTime = audioRef.current.currentTime + value;
      console.log(audioRef.current.currentTime);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md"
    >
      <audio ref={audioRef} />
      <div className="flex items-center justify-center gap-4">
        <Button onClick={() => goBack(1)} className="w-full mb-4 h-16 relative overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key="back"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Rewind className="w-6 h-6" />
            </motion.div>
          </AnimatePresence>
        </Button>
        <Button onClick={togglePlay} className="w-full mb-4 h-16 relative overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            {isPlaying ? (
              <motion.div
                key="pause"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Pause className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Play className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
        <Button onClick={() => goForward(1)} className="w-full mb-4 h-16 relative overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key="forward"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <FastForward className="w-6 h-6" />
            </motion.div>
          </AnimatePresence>
        </Button>
      </div>
      <motion.div
        className="mb-2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold">Delay: {pausedTime} segundos</h1>
        <h1 className="text-2xl font-bold">Delay: {delay} segundos</h1>
      </motion.div>
      {/* <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Slider min={0} max={300} step={1} value={[delay]} onValueChange={handleDelayChange} disabled={isPlaying} />
      </motion.div> */}
    </motion.div>
  )
}

