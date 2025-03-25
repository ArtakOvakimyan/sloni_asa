'use client';

import { createContext, useContext, useRef } from 'react';

const AudioContext = createContext();

export function AudioProvider({ children }) {
    const audioRef = useRef(null);

    const play = (src) => {
        stop();

        audioRef.current = new Audio(src);
        audioRef.current.play().catch(console.error);
    };

    const stop = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    return (
        <AudioContext.Provider value={{ play, stop }}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudioContext() {
    return useContext(AudioContext);
}