import { SiSpeedtest } from "react-icons/si";
import Jumbotron from "./components/Jumbotron";
import Navbar from "./components/Navbar";
import TrendingSection from "./components/TrendingSection";
import { MdOutlinePayment, MdOutlineSecurity } from "react-icons/md";
import { FaMedal } from "react-icons/fa6";
import RevealOnScroll from "./components/RevealOnScroll";
import BestSellersSection from "./components/BestSellersSection";
import SubjectsSection from "./components/SubjectsSection";

export default function Home() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className="bg-main-background">
                <Jumbotron />
                <TrendingSection />
                <RevealOnScroll>
                    <section className="w-full grid grid-cols-2 sm:grid-cols-4 py-2 place-items-center bg-white bg-opacity-30 gap-2 mt-10">
                        <div className="w-full text-center text-black font-bold">
                            <SiSpeedtest className="text-8xl mb-2 mx-auto text-secondary" />
                            <span className="mt-2">Quick Delivery</span>
                        </div>
                        <div className="w-full text-center text-black font-bold">
                            <MdOutlinePayment className="text-8xl mb-2 mx-auto text-secondary" />
                            <span className="mt-2">Secure Payment</span>
                        </div>
                        <div className="w-full text-center text-black font-bold">
                            <FaMedal className="text-8xl mb-2 mx-auto text-secondary" />
                            <span className="mt-2">Best Quality</span>
                        </div>
                        <div className="w-full text-center text-black font-bold">
                            <MdOutlineSecurity className="text-8xl mb-2 mx-auto text-secondary" />
                            <span className="mt-2">Return Guarantee</span>
                        </div>
                    </section>
                </RevealOnScroll>
                <RevealOnScroll>
                    <BestSellersSection />
                </RevealOnScroll>
                <RevealOnScroll>
                    <SubjectsSection />
                </RevealOnScroll>
            </main>
        </>
    );
}
