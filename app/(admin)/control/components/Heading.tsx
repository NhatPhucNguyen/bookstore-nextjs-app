import React from "react";
type HeadingProps = {
    title: string;
    className?: string;
    children?: React.ReactNode;
};
const Heading = ({ title, children, className }: HeadingProps) => {
    return (
        <header className="flex flex-row justify-between px-2 items-center">
            <h1 className={`text-xl font-semibold ${className}`}>{title}</h1>
            <>{children}</>
        </header>
    );
};

export default Heading;
