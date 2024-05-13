import { Review } from "@prisma/client";
import React from "react";
import { FaStar } from "react-icons/fa6";
const RatingBar = ({
    ratingNumber,
    count,
    total,
}: {
    ratingNumber: number;
    count: number;
    total: number;
}) => {
    return (
        <div className="w-full flex flex-row gap-1 sm:gap-5">
            <div className="h-5 w-12 flex items-center gap-1 text-sm">
                <FaStar className="text-orange-400" />
                <span className="text-black">{ratingNumber}</span>
            </div>
            <div className="bg-gray-200 w-full h-1 mt-2">
                <div
                    className={`${
                        count > 0
                            ? `bg-orange-500 w-${Math.round(
                                  (count / total) * 12
                              )}/12`
                            : "bg-gray-200 w-full"
                    } h-full`}
                />
            </div>

            <div className="text-sm w-12 text-black">
                <span>{Math.round((count / total) * 100)}%</span>
            </div>
        </div>
    );
};
const RatingCount = ({ reviews }: { reviews: Review[] }) => {
    let rating: { [key: number]: number } = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    };
    reviews.forEach((review) => {
        rating[review.rating] += 1;
    });
    return (
        <div className="w-full">
            <RatingBar
                ratingNumber={5}
                count={rating[5]}
                total={reviews.length}
            />
            <RatingBar
                ratingNumber={4}
                count={rating[4]}
                total={reviews.length}
            />
            <RatingBar
                ratingNumber={3}
                count={rating[3]}
                total={reviews.length}
            />
            <RatingBar
                ratingNumber={2}
                count={rating[2]}
                total={reviews.length}
            />
            <RatingBar
                ratingNumber={1}
                count={rating[1]}
                total={reviews.length}
            />
        </div>
    );
};

export default RatingCount;
