const emojis = ['🍒', '🍋', '🍊', '🍇', '🍉', '🍓', '🍍', '🥝', '🥥', '🎰', '💰', '💎'];

self.onmessage = function(e) {
    const { action } = e.data;

    if (action === 'spin') {
        const { slotId, finalIndex } = e.data;
        const totalSpins = 30;
        let spinCount = 0;

        // Генерируем начальный набор эмодзи для слота
        const initialEmojis = Array.from({ length: 20 }, () =>
            emojis[Math.floor(Math.random() * emojis.length)]
        );

        // Отправляем начальный набор в основной поток
        self.postMessage({
            action: 'init',
            slotId,
            emojis: initialEmojis
        });

        // Имитация вращения
        const interval = setInterval(() => {
            spinCount++;

            // Отправляем обновление позиции
            self.postMessage({
                action: 'update',
                slotId,
                position: spinCount % 20
            });

            // Остановка вращения
            if (spinCount >= totalSpins) {
                clearInterval(interval);
                self.postMessage({
                    action: 'stop',
                    slotId,
                    finalEmoji: emojis[finalIndex],
                    position: finalIndex
                });
            }
        }, 50);
    }
};