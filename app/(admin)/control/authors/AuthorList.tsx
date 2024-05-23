import { getAuthors } from "@/app/actions/authorActions";
import AuthorDataGrid from "./AuthorDataGrid";
const AuthorList = async () => {
    const { authors, error } = await getAuthors();
    if (error) {
        return <div>{error.message}</div>;
    }
    return <AuthorDataGrid authors={authors}/>;
};

export default AuthorList;
