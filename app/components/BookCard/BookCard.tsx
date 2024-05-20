import React from "react";
import { BookDetails } from "../../(admin)/control/books/BookDataGrid";
import BookCardImage from "./BookCardImage";
import Link from "next/link";
import { calculateRatingAvg } from "@/app/utils/calculateRatingAvg";
type BookCardProps = {
    book: BookDetails;
};
export const BOOK_TITLE_MAX_LENGTH = 35;
const BookCard = ({ book }: BookCardProps) => {
    return (
        <div className="w-full min-h-[28rem] sm:h-full sm:flex flex-col">
            <BookCardImage
                imageUrl={book.imageUrl}
                rating={calculateRatingAvg(book.reviews)}
            />
            <Link href={`/books?subject=${book.subjects[0].id}`} className="block text-white text-center mt-3 font-bold hover:underline">
                {book.subjects[0].name}
            </Link>
            <Link
                href={`/books/${book.isbn}`}
                className="block text-black text-center mt-3 font-bold text-wrap hover:underline"
            >
                {book.title.length > BOOK_TITLE_MAX_LENGTH
                    ? book.title.slice(0, BOOK_TITLE_MAX_LENGTH) + "..."
                    : book.title}
            </Link>
            <div className="text-black text-sm">
                <div className="text-center mt-3 italic">
                    {book.authors[0].name}
                </div>
            </div>
            <Link
                href={`/books/${book.isbn}`}
                className="min-w-40 max-w-60 h-8 border border-white mx-auto rounded-md flex justify-center items-center gap-5 mt-10 font-bold hover:bg-myPurple hover:cursor-pointer sm:mt-auto sm:py-5"
            >
                {book.discount > 0 && (
                    <span>
                        $
                        {((book.price * (100 - book.discount)) / 100).toFixed(
                            2
                        )}
                    </span>
                )}
                <span
                    className={
                        book.discount > 0
                            ? "text-black line-through"
                            : "text-white"
                    }
                >
                    ${book.price.toFixed(2)}
                </span>
            </Link>
        </div>
    );
};

export default BookCard;
