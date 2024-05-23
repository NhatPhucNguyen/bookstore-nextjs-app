import { metadata } from "@/app/layout";
import Heading from "../../components/Heading";
import AuthorImage from "./AuthorImage";
import { Link } from "@mui/material";
import { BackButton } from "@/app/components/Button";
import { mainTitle } from "@/app/utils/globalVariables";
import { getAuthorById } from "@/app/actions/authorActions";
metadata.title = `${mainTitle} | Author Details`;
const AuthorDetails = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const { author, error } = await getAuthorById(id);
    if (error) {
        return <div>{error.message}</div>;
    }
    if (!author) {
        return <div>No author found</div>;
    }
    return (
        <div className="sm:mt-10">
            <Heading title={"Author: " + author.name}>
                <BackButton href="/control/authors" />
            </Heading>
            <section className="md:grid grid-cols-3 mt-4">
                <AuthorImage author={author} />
                <section className="p-1 col-span-2">
                    <h2 className="font-bold text-lg">About</h2>
                    <p className="min-h-60 whitespace-pre-wrap">
                        {author.bio || "Not updated yet"}
                    </p>
                    <h3 className="font-bold text-md">Website</h3>
                    {author.website ? (
                        <Link href={author.website} target="_blank">
                            {author.website || "N/A"}
                        </Link>
                    ) : (
                        <p>N/A</p>
                    )}
                </section>
            </section>
        </div>
    );
};
export default AuthorDetails;
