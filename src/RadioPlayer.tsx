/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

function RadioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pauseTimeout, setPauseTimeout] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [_, setElapsedPauseTime] = useState<any>(0);
  const [pauseInterval, setPauseInterval] = useState<number | null>(null);


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

  return (
    <video
      ref={audioRef as unknown as React.RefObject<HTMLVideoElement>}
      controls
      autoPlay
      
    />
  );
}

export default RadioPlayer;
