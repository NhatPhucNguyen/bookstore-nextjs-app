"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";

const RevealOnScroll = ({ children }: { children: ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(entry.isIntersecting);
                }
            });
        });
        const current = domRef.current;
        observer.observe(current!);
        return () => {
            if (current) {
                observer.unobserve(current!);
            }
        };
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
