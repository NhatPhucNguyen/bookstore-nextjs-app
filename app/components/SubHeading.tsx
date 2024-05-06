import React from "react";
type SubHeadingProps = {
    parent?: string[] | string;
    current: string;
};
const SubHeading = ({ parent, current }: SubHeadingProps) => {
    return (
        <nav className="hidden sm:block bg-white bg-opacity-15 py-4">
            <h2 className="pl-2">
                {parent && (
                    <span className="text-black font-semibold">
                        {Array.isArray(parent) ? parent.join(" / ") : parent} /{" "}
                    </span>
                )}
                <span className="text-white font-semibold">{current}</span>
            </h2>
        </nav>
    );
};

export default SubHeading;
