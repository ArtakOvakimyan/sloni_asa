'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './SlotMachine.module.css';

const EMOJIS = ['7️⃣', '🍋', '🍇', '🍻'];

export default function SlotMachine() {
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState('');
    const [resultClass, setResultClass] = useState('');
    const workerRef = useRef(null);
    const finalResults = useRef({});

    useEffect(() => {
        workerRef.current = new Worker(new URL('../../../public/slots-worker.js', import.meta.url));

        workerRef.current.onmessage = (e) => {
            const { action, slotId, position, emojis } = e.data;

            if (action === 'init') {
                const slot = document.getElementById(slotId);
                if (!slot) return;

                slot.innerHTML = '';
                emojis.forEach(emoji => {
                    const emojiElement = document.createElement('div');
                    emojiElement.className = styles.emoji;
                    emojiElement.textContent = emoji;
                    slot.appendChild(emojiElement);
                });
            }
            else if (action === 'update') {
                document.getElementById(slotId).style.transform = `translateY(-${position * 100}px)`;
            }
            else if (action === 'stop') {
                document.getElementById(slotId).style.transform = `translateY(-${position * 100}px)`;
                finalResults.current[slotId] = emojis[position]; // Используем emojis из worker

                if (Object.keys(finalResults.current).length === 3) {
                    checkResult();
                }
            }
        };

        return () => workerRef.current?.terminate();
    }, []);

    const checkResult = () => {
        setIsSpinning(false);
        const { slot1, slot2, slot3 } = finalResults.current;
        console.log('Results:', slot1, slot2, slot3);

        if (slot1 === slot2 && slot2 === slot3) {
            setResult('Бинго! Вы выиграли! 🎉');
            setResultClass(styles.win);
        } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
            setResult('Почти! Есть совпадение!');
            setResultClass('');
        } else {
            setResult('Попробуйте ещё раз!');
            setResultClass('');
        }
    };

    const handleSpin = () => {
        if (isSpinning) return;

        setIsSpinning(true);
        setResult('');
        setResultClass('');
        finalResults.current = {};

        ['slot1', 'slot2', 'slot3'].forEach(slotId => {
            const finalIndex = Math.floor(Math.random() * EMOJIS.length);
            workerRef.current.postMessage({
                action: 'spin',
                slotId,
                finalIndex,
                emojis: EMOJIS // Передаём фиксированный набор эмодзи
            });
        });
    };

    return (
        <div className={styles.slotMachine}>
            <div className={styles.slots}>
                {['slot1', 'slot2', 'slot3'].map(slotId => (
                    <div key={slotId} className={styles.slot}>
                        <div className={styles.slotInner} id={slotId}></div>
                    </div>
                ))}
            </div>

            <button
                className={styles.btnSpin}
                onClick={handleSpin}
                disabled={isSpinning}
            >
                {isSpinning ? 'Крутим...' : 'Крутить!'}
            </button>

            <div className={`${styles.result} ${resultClass}`}>{result}</div>
        </div>
    );
}