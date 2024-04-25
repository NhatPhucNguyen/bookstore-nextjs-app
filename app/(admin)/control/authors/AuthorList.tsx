import AuthorDataGrid from "./AuthorDataGrid";
import { getAuthors } from "./actions";
const AuthorList = async () => {
    const { authors, errorMessage } = await getAuthors();
    if (!authors) {
        return <div>{errorMessage}</div>;
    }
    return <AuthorDataGrid authors={authors || []} />;
};

export default AuthorList;
