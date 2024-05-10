import ModalContextProvider from "@/app/context/ModalContext";
import ToastProvider from "@/app/context/ToastContext";
import { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import { getUser } from "@/app/lib/session";
import { redirect } from "next/navigation";

const ControlLayout = async ({ children }: { children: ReactNode }) => {
    const user = await getUser();
    if (!user) {
        redirect("/login");
    }
    if (user.role !== "ADMIN") {
        redirect("/books");
    }
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
