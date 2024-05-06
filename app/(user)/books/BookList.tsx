import { getAllBooks } from "@/app/(admin)/control/books/actions";
import BookCard from "@/app/components/BookCard/BookCard";
import React from "react";
const BookList = async ({ subject }: { subject?: string }) => {
    const { books } = await getAllBooks({ subjectId: subject });
    return (
        <>
            {books?.map((book) => {
                return (
                    <div
                        key={book.isbn}
                        className="mt-4 sm:mt-0 bg-white bg-opacity-10 py-4"
                    >
                        <BookCard book={book} />
                    </div>
                );
            })}
        </>
    );
};

export default BookList;
