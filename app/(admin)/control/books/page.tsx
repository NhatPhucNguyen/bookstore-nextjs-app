import BookDataGrid from "./BookDataGrid";
import BookHeading from "./BookHeading";
import { getAllBooks } from "../../../actions/bookActions";

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
