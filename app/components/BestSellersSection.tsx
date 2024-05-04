import React from "react";
import { getAllBooks } from "../(admin)/control/books/actions";
import SellingBookCard from "./BookCard/SellingBookCard";

const BestSellersSection = async () => {
    const { books, error } = await getAllBooks({ quantity: 5});
    if (error) {
        return <div>{error.message}</div>;
    }
    return (
        <section className="max-w-full mt-10">
            <div className="flex flex-row justify-between px-5 text-black font-bold items-center">
                <h2 className="text-xl inline-block">Best Sellers</h2>
                <span className="text-sm">Scroll for more {">"}</span>
            </div>
            <div className="flex flex-row mt-2 w-full overflow-x-auto gap-4 py-2">
                {books?.map((book) => {
                    return (
                        <div
                            key={book.isbn}
                            className="min-w-72 sm:min-w-80 md:min-w-[30rem]"
                        >
                            <SellingBookCard book={book} />
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default BestSellersSection;
