import SubHeading from "@/app/components/SubHeading";
import { metadata } from "@/app/layout";
import { mainTitle } from "@/app/utils/globalVariables";
import BookList from "./BookList";
import SubjectFilter from "./SubjectFilter";
import { getSubjects } from "@/app/actions/subjectActions";
metadata.title = mainTitle + " | Books - Time to find a book to read!";
const BooksPage = async ({
    searchParams,
}: {
    searchParams?: {
        subject?: string;
    };
}) => {
    const { subjects } = await getSubjects();
    return (
        <>
            <SubHeading
                parent={[{ name: "Home", href: "/" }]}
                current="Books"
            />
            <div className="md:grid grid-cols-3 lg:grid-cols-4 pb-4">
                <div className="col-span-1 px-2 pt-4">
                    <h2 className="text-white text-2xl font-bold">Subjects</h2>
                    {subjects && <SubjectFilter subjects={subjects} />}
                </div>
                <div className="mt-4 col-span-2 sm:grid grid-cols-2 lg:grid-cols-3 gap-4 lg:col-span-3 xl:grid-cols-4 px-2">
                    <h1 className="col-span-full text-white text-2xl font-bold">
                        Books
                    </h1>
                    <BookList subject={searchParams?.subject} />
                </div>
            </div>
        </>
    );
};

export default BooksPage;
