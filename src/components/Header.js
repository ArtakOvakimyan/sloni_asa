import Link from 'next/link';

export default function Header() {
    return (
        <header className="header">
            <nav className="nav">
                <Link href="/" className="nav-link">
                    Главная
                </Link>
                <Link href="/slots-game" className="nav-link">
                    Казино 🎰
                </Link>
            </nav>
        </header>
    );
}