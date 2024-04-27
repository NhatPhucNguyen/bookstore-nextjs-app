import React from "react";
import Heading from "../components/Heading";
import BookHeading from "./BookHeading";
import { getAllBooks } from "./actions";
import BookDataGrid from "./BookDataGrid";

const BooksPage = async () => {
    const { books, error } = await getAllBooks();
    if (error) {
        return <div>{error.message}</div>;
    }
    return (
        <div className="sm:mt-2 pl-2">
            <BookHeading />
            <div className="mt-2">
                <BookDataGrid books={books} />
            </div>
        </div>
    );
};

export default BooksPage;
