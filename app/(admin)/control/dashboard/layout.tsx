import { Metadata } from "next";
import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard page for BookFinder",
};
const DashBoardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="bg-white text-black min-h-screen flex flex-col sm:flex-row">
            <Sidebar />
            <main className="sm:ml-64">{children}</main>
        </div>
    );
};

export default DashBoardLayout;
