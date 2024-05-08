import React from "react";
import { getRelatedBooks } from "./actions";
import { BookDetails } from "@/app/(admin)/control/books/BookDataGrid";
import SellingBookCard from "@/app/components/BookCard/SellingBookCard";

const RelatedBooks = async ({ book }: { book: BookDetails }) => {
    const { books, error } = await getRelatedBooks(book);
    if (error) {
        return <div>{error.message}</div>;
    }
    return (
        <div className="flex flex-col gap-4 mt-2 sm:grid grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
            {books?.map((book) => {
                return (
                    <div key={book.isbn}>
                        <SellingBookCard book={book} />
                    </div>
                );
            })}
        </div>
    );
};

export default RelatedBooks;
