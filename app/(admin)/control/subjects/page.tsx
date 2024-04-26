import SubjectDataGrid from "./SubjectDataGrid";
import SubjectHeading from "./SubjectHeading";
import { getSubjects } from "./actions";

const Subjects = async () => {
    const { subjects, error } = await getSubjects();
    return (
        <div>
            <SubjectHeading />
            {error && <div>{error.errorMessage}</div>}
            {subjects && (
                <div className="mt-2">
                    <SubjectDataGrid subjects={subjects} />
                </div>
            )}
        </div>
    );
};

export default Subjects;
