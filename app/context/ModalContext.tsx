"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import Backdrop from "../components/Backdrop";
import AuthorForm from "../(admin)/control/authors/AuthorForm";
type FormValues = "addAuthor" | undefined;
type ModalOptions = {
    open: boolean;
    formName?: FormValues;
};
type ModalContextType = {
    openModal: (formName?: FormValues) => void;
    closeModal: () => void;
};
const ModalContext = createContext<ModalContextType | null>(null);
const ModalContextProvider = ({ children }: { children: ReactNode }) => {
    const [modal, setModal] = useState<ModalOptions>({} as ModalOptions);
    const openModal = (formName?: FormValues) => {
        setModal({ open: true, formName });
    };
    const closeModal = () => {
        setModal({ open: false });
    };
    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {modal.open && (
                <Backdrop
                    handleClose={closeModal}
                    className="fixed min-h-screen w-full top-0 left-0 justify-center items-center flex z-30 p-2 overflow-auto"
                >
                    {modal.formName === "addAuthor" && <AuthorForm />}
                </Backdrop>
            )}
        </ModalContext.Provider>
    );
};
export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error(
            "useModalContext must be used within a ModalContextProvider"
        );
    }
    return context;
};
export default ModalContextProvider;
