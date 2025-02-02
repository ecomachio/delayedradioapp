/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion, AnimatePresence } from "framer-motion"
import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Button } from "./components/ui/button";
import { FastForward, Pause, Play, Rewind } from "lucide-react";

function RadioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pauseTimeout, setPauseTimeout] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [_, setElapsedPauseTime] = useState<any>(0);
  const [pauseInterval, setPauseInterval] = useState<number | null>(null);
  const [delay, setDelay] = useState<number>(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

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
    setElapsedPauseTime(0);
    const interval = window.setInterval(() => {
      setElapsedPauseTime((prev: number) => prev + 1);
    }, 1000);
    setPauseInterval(interval);
  };

  const stopPauseTimer = () => {
    if (pauseInterval) {
      clearInterval(pauseInterval);
      setPauseInterval(null);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      startPauseTimer();
      audio.pause();
    } else {
      stopPauseTimer();
      audio.play().catch(error => {
        console.error('Error trying to play the audio:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const _handleTimedPause = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio || !isPlaying) return;

    // Clear any existing timeout
    if (pauseTimeout) {
      clearTimeout(pauseTimeout);
    }

    // Pause the audio
    startPauseTimer();
    audio.pause();
    setIsPlaying(false);

    // Set timeout to resume playing
    const timeout = setTimeout(() => {
      audio.play().catch(error => {
        console.error('Error trying to resume the audio:', error);
      });
      setIsPlaying(true);
      stopPauseTimer();
      setPauseTimeout(null);
    }, seconds * 1000);

    setPauseTimeout(timeout as unknown as number);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeout) {
        clearTimeout(pauseTimeout);
      }
    };
  }, [pauseTimeout]);

  const handleAudioChange = () => {
    const delay = Math.round(audioRef.current!.currentTime! - audioRef.current!.duration!) + 5;
    if (delay > 0) {
      setDelay(0);
    } else {
      setDelay(delay);
    }
  };

  const goBack = (seconds: number) => {
    audioRef.current!.currentTime = audioRef.current!.currentTime! - seconds;
    handleAudioChange();
  };

  const goForward = (seconds: number) => {
    audioRef.current!.currentTime = audioRef.current!.currentTime! + seconds;
    handleAudioChange();
  };

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
            {!audioRef.current?.paused ? (
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
        <h1 className="text-2xl font-bold">Delay: {delay} segundos</h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className='h-20 flex flex-col items-center justify-center'
      >

        <audio
          ref={audioRef}
          onSeeked={handleAudioChange}
          controls
          autoPlay
          className='w-full h-10'
        />


      </motion.div>
    </motion.div>

  );
}

export default RadioPlayer;
