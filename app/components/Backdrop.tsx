import React from "react";
type BackdropProps = {
    handleClose: () => void;
};
const Backdrop = ({ handleClose }: BackdropProps) => {
    return (
        <div
            className="sm:hidden fixed w-full h-screen bg-gray-400 opacity-70 z-10"
            onClick={() => {
                handleClose();
            }}
        ></div>
    );
};

export default Backdrop;
