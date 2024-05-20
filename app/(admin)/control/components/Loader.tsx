"use client";
import { Backdrop, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";

const Loader = () => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    });
    return (
        <Backdrop
            sx={{
                color: "#fff",
                zIndex: 50,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                position: "absolute",
            }}
            open
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default Loader;
