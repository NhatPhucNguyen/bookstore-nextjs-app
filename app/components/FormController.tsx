import React, { ReactNode } from "react";
import { FieldError, Merge } from "react-hook-form";
type FormControllerProps = {
    children: ReactNode;
    className?: string;
    error?: FieldError | Merge<FieldError, (FieldError | undefined)[]>;
};
const FormController = ({
    children,
    className,
    error,
}: FormControllerProps) => {
    return (
        <div
            className={`w-full mb-2 [&_:is(input,textarea)]:border [&_:is(input,textarea)]:border-gray-300 ${
                error && "[&_:is(input,textarea)]:border-red-500"
            } ${className}`}
        >
            {children}
            {error && (
                <span className="block text-red-500 ml-1">{error.message}</span>
            )}
        </div>
    );
};

export default FormController;
