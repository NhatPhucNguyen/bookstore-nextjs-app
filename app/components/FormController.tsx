import React, { ReactNode } from "react";
import { FieldError } from "react-hook-form";
type FormControllerProps = {
    children: ReactNode;
    className?: string;
    error?: FieldError;
};
const FormController = ({
    children,
    className,
    error,
}: FormControllerProps) => {
    return (
        <div className={`w-full mb-2 ${className}`}>
            {children}
            {error && <span className="block text-red-500 ml-1">{error.message}</span>}
        </div>
    );
};

export default FormController;
