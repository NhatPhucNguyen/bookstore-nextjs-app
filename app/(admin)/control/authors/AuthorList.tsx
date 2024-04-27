import AuthorDataGrid from "./AuthorDataGrid";
import { getAuthors } from "./actions";
const AuthorList = async () => {
    const { authors, error } = await getAuthors();
    if (error) {
        return <div>{error.message}</div>;
    }
    return <AuthorDataGrid authors={authors}/>;
};

export default AuthorList;
