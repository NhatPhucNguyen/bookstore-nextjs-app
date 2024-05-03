"use client";
import React from "react";
import Image from "next/image";
const BookCardImage = ({ imageUrl }: { imageUrl: string | null }) => {
    return (
        <Image
            unoptimized
            src={imageUrl || "/unknown-book.png"}
            alt={"Book cover image"}
            width={0}
            height={0}
            sizes="100%"
            onError={(e) => {
                e.currentTarget.src = "/unknown-book.png";
            }}
            objectFit="content"
            style={{
                width: "250px",
                height: "250px",
                objectFit: "fill",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block"
            }}
            className="rounded-lg"
        />
    );
};

export default BookCardImage;
