"use client";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { createContext, useContext } from "react";

type ToastValues = {
    toastSuccess: (message: string) => void;
    toastError: (message: string) => void;
};

interface ToastProviderProps {
    children: React.ReactNode;
}
const ToastContext = createContext<ToastValues | null>(null);
const ToastProvider = ({ children }: ToastProviderProps) => {
    const toastError = (message: string) => {
        toast.error(message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };
    const toastSuccess = (message: string) => {
        toast.success(message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };
    return (
        <ToastContext.Provider value={{ toastError, toastSuccess }}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    );
}
export const useToastContext = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error(
            "useToastContext must be used within a ToastProvider"
        );
    }
    return context;
};

export default ToastProvider;