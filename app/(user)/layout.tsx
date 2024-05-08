import React, { ReactNode } from "react";
import Navbar from "../components/Navbar";

const UserLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className="bg-main-background min-h-screen w-full">{children}</main>
        </>
    );
};

export default UserLayout;
