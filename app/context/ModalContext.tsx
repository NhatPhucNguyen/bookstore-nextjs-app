"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import Backdrop from "../components/Backdrop";
import AuthorForm from "../(admin)/control/authors/AuthorForm";
import { Author } from "@prisma/client";
type FormValues = "addAuthor" | "updateAuthor" | undefined;
type DataValues = {
    author?: Author;
};
type ModalOptions = {
    open: boolean;
    formName?: FormValues;
    data?: DataValues;
};
type ModalContextType = {
    openModal: (options:FormRenderOptions) => void;
    closeModal: () => void;
};
type FormRenderOptions = Pick<ModalOptions, "formName" | "data">;
const ModalContext = createContext<ModalContextType | null>(null);
const formRender = ({ formName, data }: FormRenderOptions) => {
    switch (formName) {
        case "addAuthor":
            return <AuthorForm />;
        case "updateAuthor":
            if (!data?.author) {
                throw new Error(
                    "Author data is required for updateAuthor form"
                );
            }
            return <AuthorForm author={data?.author} />;
        default:
            return null;
    }
};
const ModalContextProvider = ({ children }: { children: ReactNode }) => {
    const [modal, setModal] = useState<ModalOptions>({} as ModalOptions);
    const openModal = ({ formName, data }: FormRenderOptions) => {
        console.log(formName);
        setModal({ open: true, formName, data: data });
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
                    className="fixed min-h-screen w-full top-0 left-0 z-30 p-2 overflow-auto"
                >
                    {formRender({ formName: modal.formName, data: modal.data })}
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
