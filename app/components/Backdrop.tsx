import React,{MouseEvent, useRef} from "react";
type BackdropProps = {
    handleClose: () => void;
    children?: React.ReactNode;
    className?: string;
};
const Backdrop = ({ handleClose, className, children }: BackdropProps) => {
    const ref = useRef<HTMLDivElement>(null);
    return (
        <div
            className={`fixed w-full h-screen bg-gray-900 bg-opacity-70 z-10 ${className}`}
            ref={ref}
            onClick={(e:MouseEvent<HTMLDivElement>) => {
                if(e.target === ref.current){
                    handleClose();
                }
            }}
        >
            {children}
        </div>
    );
};

export default Backdrop;
