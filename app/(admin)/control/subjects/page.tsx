import { getSubjects } from "@/app/actions/subjectActions";
import SubjectDataGrid from "./SubjectDataGrid";
import SubjectHeading from "./SubjectHeading";

const Subjects = async () => {
    const { subjects, error } = await getSubjects();
    return (
        <div>
            <SubjectHeading />
            {error && <div>{error.message}</div>}
            {subjects && (
                <div className="mt-2">
                    <SubjectDataGrid subjects={subjects} />
                </div>
            )}
        </div>
    );
};

export default Subjects;
