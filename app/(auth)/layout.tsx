import { Metadata } from "next";
import React from "react";
import Navbar from "../components/Navbar";
export const metadata: Metadata = {
    title: "Login",
    description: "Login page for BookFinder",
};
const LoginLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <header>
                <Navbar simple />
            </header>
            <main className="bg-main-background min-h-screen">{children}</main>
        </>
    );
};

export default LoginLayout;
