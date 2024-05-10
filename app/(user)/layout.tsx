import React, { ReactNode } from "react";
import Navbar from "../components/Navbar";
import { getUser } from "../lib/session";

const UserLayout = async ({ children }: { children: ReactNode }) => {
    const user = await getUser();
    return (
        <>
            <header>
                <Navbar isAuthenticated={user ? true : false} />
            </header>
            <main className="bg-main-background min-h-screen w-full">
                {children}
            </main>
        </>
    );
};

export default UserLayout;
