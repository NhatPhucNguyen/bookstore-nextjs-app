import React, { ReactNode } from 'react'

const FormController = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return <div className={`w-full mb-2 ${className}`}>{children}</div>;
};

export default FormController