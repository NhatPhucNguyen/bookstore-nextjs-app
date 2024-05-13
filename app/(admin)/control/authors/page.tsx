import { Suspense } from "react";
import AuthorHeading from "./AuthorHeading";
import AuthorList from "./AuthorList";
import { metadata } from "@/app/layout";
import { mainTitle } from "@/app/utils/globalVariables";
metadata.title = mainTitle + " | Authors";
const Page = () => {
    return (
        <div className="sm:mt-10 pl-2">
            <AuthorHeading />
            <div className="mt-2">
                <AuthorList />
            </div>
        </div>
    );
};

export default Page;
