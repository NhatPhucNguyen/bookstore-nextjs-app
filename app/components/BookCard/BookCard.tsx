import React from "react";
import { BookDetails } from "../../(admin)/control/books/BookDataGrid";
import BookCardImage from "./BookCardImage";
type BookCardProps = {
    book: BookDetails;
};
const BOOK_TITLE_MAX_LENGTH = 35;
const BookCard = ({ book }: BookCardProps) => {
    return (
        <div className="w-full sm:h-full sm:flex flex-col">
            <BookCardImage imageUrl={book.imageUrl} rating={book.rating}/>
            <div className="text-white text-center mt-3 font-bold">
                {book.subjects[0].name}
            </div>
            <div className="text-black text-center mt-3 font-bold text-wrap">
                {book.title.length > BOOK_TITLE_MAX_LENGTH
                    ? book.title.slice(0, BOOK_TITLE_MAX_LENGTH) + "..."
                    : book.title}
            </div>
            <div className="text-black text-sm">
                <div className="text-center mt-3 font-bold italic">
                    {book.authors[0].name}
                </div>
            </div>
            <div className="min-w-40 max-w-60 h-8 border border-white mx-auto rounded-md flex justify-center items-center gap-5 mt-10 font-bold hover:bg-myPurple sm:mt-auto sm:py-5">
                {book.discount > 0 && <span>${((book.price * (100 - book.discount)) / 100).toFixed(2)}</span>}
                <span className={book.discount > 0 ?"text-black" : "text-white"}>${book.price.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default BookCard;
