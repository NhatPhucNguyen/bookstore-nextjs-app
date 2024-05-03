import Jumbotron from "./components/Jumbotron";
import Navbar from "./components/Navbar";
import TrendingSection from "./components/TrendingSection";

export default function Home() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className="md:px-2 bg-main-background">
                <Jumbotron />
                <TrendingSection />
            </main>
        </>
    );
}
