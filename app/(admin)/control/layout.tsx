"use client";
import React, { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import ModalContextProvider from "@/app/context/ModalContext";

const ControlLayout = ({ children }: { children: ReactNode }) => {
    return (
        <ModalContextProvider>
            <div className="bg-white text-black min-h-screen flex flex-col sm:flex-row">
                <Sidebar />
                <main className="sm:ml-64 w-full">{children}</main>
            </div>
        </ModalContextProvider>
    );
};

export default ControlLayout;
