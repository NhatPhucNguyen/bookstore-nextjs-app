import React, { ReactNode } from "react";
import Navbar from "../components/Navbar";
import { getUser } from "../lib/session";
import ToastProvider from "../context/ToastContext";
import CartProvider from "../context/CartContext";

const UserLayout = async ({ children }: { children: ReactNode }) => {
    const user = await getUser();
    return (
        <CartProvider>
            <header>
                <Navbar isAuthenticated={user ? true : false} />
            </header>
            <main className="bg-main-background min-h-screen w-full">
                <ToastProvider>{children}</ToastProvider>
            </main>
        </CartProvider>
    );
};

export default UserLayout;
