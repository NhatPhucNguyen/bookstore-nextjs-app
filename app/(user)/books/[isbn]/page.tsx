import TableDetailRow from "@/app/(admin)/control/books/[isbn]/TableDetailRow";
import BookCardImage from "@/app/components/BookCard/BookCardImage";
import SubHeading from "@/app/components/SubHeading";
import { calculateRatingAvg } from "@/app/utils/calculateRatingAvg";
import { mainTitle } from "@/app/utils/globalVariables";
import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import AddToCart from "./AddToCart";
import RatingController from "./RatingController";
import RatingCount from "./RatingCount";
import RelatedBooks from "./RelatedBooks";
import { getBookByIsbn } from "@/app/actions/bookActions";
import { getUserRating } from "@/app/actions/reviewActions";
const MAX_TITLE_LENGTH = 40;
const BookDetails = async ({ params }: { params: { isbn: string } }) => {
    const { book } = await getBookByIsbn(params.isbn);
    const rating = await getUserRating(params.isbn);
    if (!book) return <div>Book not found</div>;
    return (
        <>
            <SubHeading
                parent={[
                    { name: "Home", href: "/" },
                    { name: "Books", href: "/books" },
                ]}
                current={
                    book.title.length > MAX_TITLE_LENGTH
                        ? book.title.slice(0, MAX_TITLE_LENGTH - 3) + "..."
                        : book.title
                }
            />
            <div className="pt-2 px-1 md:px-10">
                <div className="md:grid grid-cols-2 xl:grid-cols-3">
                    <div className="order-2 xl:col-span-1 md:flex items-center">
                        <BookCardImage
                            imageUrl={book.imageUrl}
                            width={300}
                            height={300}
                            className="h-fit"
                        />
                    </div>
                    <div className="xl:col-span-2">
                        <section className="mt-2 w-fit mx-auto md:mx-0">
                            <div className="text-white text-center md:text-left">
                                Your review
                            </div>
                            <div className="md:flex items-center gap-3">
                                <div>
                                    <RatingController
                                        isbn={book.isbn}
                                        rating={rating || 0}
                                    />
                                </div>
                                <div className="border text-gray-800 text-center rounded-md mt-2 md:w-32 md:py-1">
                                    {book.reviews.length} Reviews
                                </div>
                            </div>
                        </section>
                        <section className="mt-2">
                            <h1 className="text-xl font-bold text-center">
                                {book.title}
                            </h1>
                            <p className="min-h-80 whitespace-pre-wrap overflow-auto mt-2 px-1">
                                {book.description || "No description available"}
                            </p>
                            <div className="py-2 text-center md:text-left">
                                {book.discount > 0 ? (
                                    <>
                                        <span className="text-green-400 font-bold text-2xl">
                                            $
                                            {(
                                                (book.price *
                                                    (100 - book.discount)) /
                                                100
                                            ).toFixed(2)}
                                        </span>
                                        <span className="ml-8 text-black line-through">
                                            ${book.price}
                                        </span>
                                        <span className="ml-4 bg-yellow-600 px-2 py-1 rounded-md">
                                            {book.discount}%
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-green-400 font-bold text-2xl">
                                            ${book.price}
                                        </span>
                                    </>
                                )}
                            </div>
                            {book.quantity === 0 ? <div className="text-center text-xl font-bold text-red-500 md:text-left">Sold out</div> : <AddToCart maxQuantity={book.quantity} />}
                        </section>
                    </div>
                </div>

                <section className="mt-2 md:grid grid-cols-2 gap-2">
                    <div>
                        <div>
                            <h2 className="font-bold text-lg mb-2">Details</h2>

                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        <TableDetailRow
                                            field="ISBN"
                                            value={book.isbn}
                                        />
                                        <TableDetailRow
                                            field="Title"
                                            value={book.title}
                                        />
                                        <TableDetailRow
                                            field="Authors"
                                            value={book.authors
                                                .map((author) => author.name)
                                                .join(", ")}
                                        />
                                        <TableDetailRow
                                            field="Subjects"
                                            value={book.subjects
                                                .map((subject) => subject.name)
                                                .join(", ")}
                                        />
                                        <TableDetailRow
                                            field="Published Date"
                                            value={book.publishedDate?.toLocaleDateString()}
                                        />
                                        <TableDetailRow
                                            field="Quantity"
                                            value={book.quantity || "Out of stock"}
                                        />
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <div className="mt-2">
                            <h2 className="font-bold text-lg mb-2">
                                Customer Reviews
                            </h2>
                            <div className="flex flex-row bg-white bg-opacity-70 items-center gap-1 sm:gap-5 py-2 px-1 sm:py-5 sm:px-3 shadow-md rounded-md">
                                <div>
                                    <h3 className="text-center text-black">
                                        <span className="text-2xl font-bold">
                                            {calculateRatingAvg(book.reviews).toFixed(1)}
                                        </span>{" "}
                                        out of 5
                                    </h3>
                                    <RatingController
                                        rating={calculateRatingAvg(
                                            book.reviews
                                        )}
                                        key={calculateRatingAvg(book.reviews)}
                                        readOnly
                                        isbn={book.isbn}
                                        className="bg-inherit"
                                    />
                                </div>
                                <div className="w-full">
                                    <RatingCount reviews={book.reviews} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 md:mt-0">
                        <h2 className="font-bold text-lg">Related Books</h2>
                        <RelatedBooks book={book} />
                    </div>
                </section>
            </div>
        </>
    );
};

export async function generateMetadata({
    params,
}: {
    params: { isbn: string };
}) {
    const { book } = await getBookByIsbn(params.isbn);
    return {
        title: mainTitle + " | " + book?.title || "Book Details",
        description: "Details of a book",
    };
}

export default BookDetails;
