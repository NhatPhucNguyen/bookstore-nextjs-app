import ModalContextProvider from "@/app/context/ModalContext";
import ToastProvider from "@/app/context/ToastContext";
import { ReactNode } from "react";
import Sidebar from "./components/Sidebar";

const ControlLayout = ({ children }: { children: ReactNode }) => {
    return (
        <ToastProvider>
            <ModalContextProvider>
                <div className="bg-white text-black min-h-screen flex flex-col sm:flex-row">
                    <Sidebar />
                    <main className="sm:pl-64 w-full">{children}</main>
                </div>
            </ModalContextProvider>
        </ToastProvider>
    );
};

export default ControlLayout;
