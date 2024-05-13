import React from "react";
import BookCardImage from "./BookCardImage";
import { BookDetails } from "@/app/(admin)/control/books/BookDataGrid";
import { FaStar } from "react-icons/fa6";
import { calculateRatingAvg } from '../../utils/calculateRatingAvg';
import Link from "next/link";
const BOOK_TITLE_MAX_LENGTH = 35;
const SellingBookCard = ({ book }: { book: BookDetails }) => {
    return (
        <div className="grid grid-cols-2 w-full">
            <BookCardImage imageUrl={book.imageUrl} />
            <div className="w-full">
                <div className="mx-auto w-full px-1 flex flex-col h-full">
                    <Link href={`/books?subject=${book.subjects[0].id}`} className="bg-black bg-opacity-20 px-2 py-1 text-center rounded-md hover:underline">
                        {book.subjects[0].name}
                    </Link>
                    <div className="bg-yellow-300 text-orange-500 rounded-md text-center font-bold flex justify-center items-center gap-2 text-xl w-full mt-1">
                        <FaStar className="inline-block" />
                        <span className="inline-block">
                            {calculateRatingAvg(book.reviews).toFixed(1)}
                        </span>
                    </div>
                    <Link href={`/books/${book.isbn}`} className="text-black font-bold mt-3 hover:underline">
                        {book.title.length > BOOK_TITLE_MAX_LENGTH
                            ? book.title.slice(0, BOOK_TITLE_MAX_LENGTH) + "..."
                            : book.title}
                    </Link>
                    <div className="text-black text-sm">
                        <div className="mt-1 font-bold italic">
                            {book.authors[0].name}
                        </div>
                    </div>
                    <div className="flex flex-row justify-between mt-auto pb-2">
                        {book.discount > 0 && (
                            <span>
                                $
                                {(
                                    (book.price * (100 - book.discount)) /
                                    100
                                ).toFixed(2)}
                            </span>
                        )}
                        <span
                            className={
                                book.discount > 0 ? "text-gray-700" : "text-white"
                            }
                        >
                            ${book.price.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellingBookCard;
