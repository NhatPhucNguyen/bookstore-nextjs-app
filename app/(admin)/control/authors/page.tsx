import { Suspense } from "react";
import AuthorHeading from "./AuthorHeading";
import AuthorList from "./AuthorList";
import Loading from "./loading";
const Page = () => {
    return (
        <div className="sm:mt-10 pl-2">
            <AuthorHeading />
            <div className="mt-2">
                <Suspense fallback={<Loading />}>
                    <AuthorList />
                </Suspense>
            </div>
        </div>
    );
};

export default Page;
