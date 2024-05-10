import { Metadata } from "next";
import React from "react";
import Navbar from "../components/Navbar";
import ToastProvider from "../context/ToastContext";
import { getUser } from "../lib/session";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
    title: "Login",
    description: "Login page for BookFinder",
};
const AuthLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const user = await getUser();
    if (user) {
        redirect("/books");
    }
    return (
        <ToastProvider>
            <header>
                <Navbar simple />
            </header>
            <main className="bg-main-background min-h-screen">{children}</main>
        </ToastProvider>
    );
};

export default AuthLayout;
