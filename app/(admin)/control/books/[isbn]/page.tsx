import { BackButton } from "@/app/components/Button";
import { metadata } from "@/app/layout";
import Heading from "../../components/Heading";
import { getBookByIsbn } from "../../../../actions/bookActions";
import BookCoverImage from "./BookCoverImage";
import {
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from "@mui/material";
import { Fragment } from "react";
import TableDetailRow from "./TableDetailRow";
import { mainTitle } from "@/app/utils/globalVariables";
metadata.title = mainTitle + " | Book Details";
const BookDetailsPage = async ({ params }: { params: { isbn: string } }) => {
    const { book, error } = await getBookByIsbn(params.isbn);
    if (error) {
        return <div>{error.message}</div>;
    }
    return (
        <div>
            <Heading title={`Book: ${book.title}`} className="sm:mt-10">
                <BackButton href="/control/books" />
            </Heading>
            <section className="mt-4">
                {book && <BookCoverImage book={book} />}
                <section className="p-1">
                    <h3>
                        <span className="font-bold">Authors:</span>{" "}
                        {book?.authors.map((author, index) => (
                            <Fragment key={index}>
                                <Link href={`/control/authors/${author.id}`}>
                                    {author.name}
                                </Link>
                                {index < book.authors.length - 1 && ", "}
                            </Fragment>
                        )) || "Not updated yet"}
                    </h3>
                    <h3>
                        <span className="font-bold">Subjects:</span>{" "}
                        {book?.subjects.map((subject, index) => (
                            <Fragment key={index}>
                                <span>{subject.name}</span>
                                {index < book.subjects.length - 1 && ", "}
                            </Fragment>
                        )) || "Not updated yet"}
                    </h3>
                    <h2 className="font-bold text-lg">Description</h2>
                    <p className="whitespace-pre-wrap">
                        {book?.description || "Not updated yet"}
                    </p>
                    <h2 className="font-bold text-lg">Details</h2>
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
                                    field="Published Date"
                                    value={book.publishedDate?.toLocaleDateString()}
                                />
                                <TableDetailRow
                                    field="Original Price"
                                    value={`$${book.price.toFixed(2)}`}
                                />
                                <TableDetailRow
                                    field="Discount"
                                    value={`${book.discount}%`}
                                />
                                <TableDetailRow
                                    field="Final Price"
                                    value={`$${
                                        ((book.price * (100 - book.discount)) /
                                        100).toFixed(2)
                                    }`}
                                />
                                <TableDetailRow
                                    field="Quantity"
                                    value={book.quantity}
                                />
                                <TableDetailRow
                                    field="Created At"
                                    value={book.createdAt.toLocaleDateString()}
                                />
                                <TableDetailRow
                                    field="Updated At"
                                    value={book.updatedAt.toLocaleDateString()}
                                />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </section>
            </section>
        </div>
    );
};

export default BookDetailsPage;
