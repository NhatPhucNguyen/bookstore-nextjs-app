"use client";
import { Rating } from "@mui/material";
import React, { useState } from "react";

const RatingController = () => {
    const [value, setValue] = useState<number | null>(0);
    return (
        <Rating
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            className="bg-white bg-opacity-50 p-2 rounded-lg"
        />
    );
};

export default RatingController;
