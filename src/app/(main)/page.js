import Link from 'next/link';
import Image from 'next/image';


export default function Home() {
    return (
        <>
            <h1 className="title">Привет, лудоман!</h1>
            <p className="description">Ты как раз по адресу:</p>

            <Link href="/slots-game" className="game-link">
                🎰 Казино 🎰
            </Link>

            <div className="image-container">
                <Image
                    src="/casicMan.png"
                    alt="Игровой автомат"
                    width={300}
                    height={200}
                    priority
                    className="slot-image"
                />
            </div>
        </>
    );
}