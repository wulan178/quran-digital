import "@/styles/globals.css";
import { Raleway } from "next/font/google";

const raleway = Raleway({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
});

export default function MyApp({ Component, pageProps }) {
    return (
        <main className={raleway.className}>
            <Component {...pageProps} />
        </main>
    );
}
