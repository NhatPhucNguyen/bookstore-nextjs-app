import React from "react";
import { getUser } from "../lib/session";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";

const PaymentLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getUser();
    if (!user) {
        return redirect("/login");
    }
    return (
        <div className="min-h-screen bg-main-background">
            <header className="bg-black">
                <Navbar
                    simple
                    paymentLayout
                    isAuthenticated={user ? true : false}
                />
            </header>
            <main className="w-full">
                {children}
            </main>
        </div>
    );
};

export default PaymentLayout;
