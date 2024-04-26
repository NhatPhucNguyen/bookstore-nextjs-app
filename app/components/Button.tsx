"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
type ButtonProps = {
    children?: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
};
const Button = (props: ButtonProps) => {
    return (
        <button
            className={"py-2 min-w-20 w-40 max-w-50 bg-active rounded-md text-white font-bold hover:bg-blueHover text-sm " + props.className}
            onClick={props.onClick}
            type={props.type || "button"}
        >
            {props.children}
        </button>
    );
};
type BackButtonProps = {
    className?: string;
    href: string;
};
export const BackButton = ({ className, href }: BackButtonProps) => {
    const router = useRouter();
    return (
        <Button
            className={"bg-orange-400 hover:bg-orange-700 " + className}
            onClick={() => {
                router.push(href);
            }}
        >
            <IoArrowBack className="inline-block mr-2 text-xl"/> Back
        </Button>
    );
};
export default Button;
