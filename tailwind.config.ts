import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "main-background":
                    "linear-gradient(45deg, #ff3198 0%, #2a0086 100%)",
            },
            colors: {
                secondary: "#9747FF",
                active: "#509CDB",
                blueHover:"#2671B1",
                myPurple:"#8D28AD"
            },
            keyframes: {
                "fade-in-down": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(-10px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
                "fade-left": {
                    "0%": {
                        opacity: "0",
                        transform: "translateX(10px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateX(0)",
                    },
                },
                "fade-right": {
                    "0%": {
                        opacity: "0",
                        transform: "translateX(-10px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateX(0)",
                    },
                },
                "sidebar":{
                    "0%": {
                        opacity: "1",
                        transform: "translateX(-100px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateX(0)",
                    },
                }
            },
            animation: {
                "fade-in-down": "fade-in-down 0.7s ease-out",
                "fade-left": "fade-left 0.7s ease-out",
                "fade-right": "fade-right 0.7s ease-out",
                "sidebar": "sidebar 0.2s linear",
            },
        },
    },
    plugins: [],
};
export default config;
