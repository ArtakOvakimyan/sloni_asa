self.onmessage = function(e) {
    const { action } = e.data;

    if (action === 'spin') {
        const { slotId, finalIndex, emojis } = e.data;
        const totalSpins = 30;
        let spinCount = 0;

        const initialEmojis = Array.from({ length: 20 }, () =>
            emojis[Math.floor(Math.random() * emojis.length)]
        );

        self.postMessage({
            action: 'init',
            slotId,
            emojis: initialEmojis
        });

        const interval = setInterval(() => {
            spinCount++;

            self.postMessage({
                action: 'update',
                slotId,
                position: spinCount % 20
            });

            if (spinCount >= totalSpins) {
                clearInterval(interval);
                self.postMessage({
                    action: 'stop',
                    slotId,
                    emojis: initialEmojis,
                    position: finalIndex
                });
            }
        }, 50);
    }
};