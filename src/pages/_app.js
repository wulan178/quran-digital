import '@/styles/globals.css'
import { Open_Sans } from "next/font/google";

const open_sans = Open_Sans({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
});

export default function MyApp({ Component, pageProps }) {
    return (
        <main className={open_sans.className}>
            <Component {...pageProps} />
        </main>
    );
}
