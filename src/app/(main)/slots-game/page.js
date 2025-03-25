"use client"
import { useAudioContext } from '@src/contexts/AudioContext';
import SlotMachine from '@/components/SlotMachine';
import {useEffect} from "react";

export default function SlotsGame() {
    const { play } = useAudioContext();
    useEffect(() => {
        play('/aram.mp3');
        return () => {

        }
    }, [play]);

    return (
        <>
            <h1 className="title">Казино 🎰</h1>
            <SlotMachine />
        </>
    );
}