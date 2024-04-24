import React from "react";
type ButtonProps = {
    children?: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
};
const Button = (props: ButtonProps) => {
    return (
        <button
            className={"py-2 w-40 bg-active rounded-md text-white font-bold hover:bg-blueHover text-sm " + props.className}
            onClick={props.onClick}
            type={props.type || "button"}
        >
            {props.children}
        </button>
    );
};

export default Button;
