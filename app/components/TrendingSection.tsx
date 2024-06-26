import React from "react";
import BookCard from "./BookCard/BookCard";
import RevealOnScroll from "./RevealOnScroll";
import { getAllBooks } from "../actions/bookActions";

const TrendingSection = async () => {
    const { books, error } = await getAllBooks({ quantity: 5 });
    return (
        <section className="px-2">
            <h2 className="mt-10 text-2xl text-center font-bold">
                Trending this week
            </h2>
            <h3 className="text-center">
                We present to you the top five trending books of this week!
            </h3>
            <RevealOnScroll>
                <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-2">
                    {error && <div>{error.message}</div>}
                    {books &&
                        books.map((book) => (
                            <div
                                className="mb-5 sm:mb-0 shadow-lg bg-gray-600 bg-opacity-20 px-1 py-4 sm:h-[32rem] md:hover:scale-105 transition-transform"
                                key={book.isbn}
                            >
                                <BookCard book={book} />
                            </div>
                        ))}
                </div>
            </RevealOnScroll>
        </section>
    );
};

export default TrendingSection;
