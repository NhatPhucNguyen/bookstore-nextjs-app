"use client";
import React, { ReactNode } from "react";

const RevealOnScroll = ({ children }: { children: ReactNode }) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const domRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => setIsVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current!);
        return () => observer.unobserve(domRef.current!);
    }, []);
    return (
        <div
            className={`transition-all duration-[1500ms]
    ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"}`}
            ref={domRef}
        >
            {children}
        </div>
    );
};

export default RevealOnScroll;
