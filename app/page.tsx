import Jumbotron from "./components/Jumbotron";
import Navbar from "./components/Navbar";

export default function Home() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className="md:px-2">
                <Jumbotron />
            </main>
        </>
    );
}
