import './globals.css';
import {AudioProvider} from "../contexts/AudioContext";

export const metadata = {
    title: 'Слоны АСА',
};

export default function RootLayout({ children }) {
    return (
        <html lang="ru">
        <body>
        <AudioProvider>
        {children}
        </AudioProvider>
        </body>
        </html>
    );
}