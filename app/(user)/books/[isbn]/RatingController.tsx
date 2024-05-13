"use client";
import { Rating } from "@mui/material";
import React, { useState } from "react";
import { createReview } from "./actions";
import { useToastContext } from "@/app/context/ToastContext";

const RatingController = ({
    isbn,
    rating,
    readOnly,
    className
}: {
    isbn: string;
    rating?: number;
    readOnly?: boolean;
    className?: string;
}) => {
    const [value, setValue] = useState<number | null>(rating || 0);
    const [loading, setLoading] = useState(false);
    const { toastError, toastSuccess } = useToastContext();
    return (
        <Rating
            disabled={loading}
            readOnly={readOnly}
            value={value}
            onChange={async (event, newValue) => {
                setLoading(true);
                const { error } = await createReview(isbn, newValue || 0);
                setLoading(false);
                if (error?.message) {
                    return toastError(error.message);
                }
                toastSuccess("Review submitted successfully");
                setValue(newValue);
            }}
            className={className || "bg-white bg-opacity-50 p-2 rounded-lg"}
        />
    );
};

export default RatingController;
