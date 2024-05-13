import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { mainTitle } from "./utils/globalVariables";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
    title: mainTitle,
    description: `${mainTitle} - Find your favorite books here!`,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="min-h-full">
            <body className={`${inter.className} min-h-screen`}>
                <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
            </body>
        </html>
    );
}
