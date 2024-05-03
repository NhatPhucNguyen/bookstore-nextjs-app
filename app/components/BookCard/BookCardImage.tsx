"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
const BookCardImage = ({
    imageUrl,
    rating,
    className,
}: {
    imageUrl: string | null;
    rating?: number;
    className?: string;
}) => {
    return (
        <figure
            className={`w-fit mx-auto relative border-2 border-white ${className}`}
        >
            {rating !== undefined && (
                <div className="bg-black w-24 absolute top-3 left-3 rounded-3xl bg-opacity-25 flex items-center gap-3">
                    <div className="text-white rounded-full w-fit p-3 bg-orange-600 ">
                        <FaStar />
                    </div>
                    <span className="font-bold">{rating.toFixed(1)}</span>
                </div>
            )}
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
                style={{
                    width: "250px",
                    height: "250px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "block",
                    objectFit: "fill",
                }}
            />
        </figure>
    );
};

export default BookCardImage;
