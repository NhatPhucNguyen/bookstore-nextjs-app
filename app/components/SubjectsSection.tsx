import React from "react";
import { getSubjects } from "../(admin)/control/subjects/actions";
import Link from "next/link";

const SubjectsSection = async () => {
    const { subjects, error } = await getSubjects();
    return (
        <section className="mt-10">
            <h2 className="text-xl inline-block text-black font-bold pl-5">
                Subjects
            </h2>
            {error && <div>{error.message}</div>}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 px-1 mt-2">
                {subjects &&
                    subjects.map((subject) => (
                        <Link
                            href={`/books?subject=${subject.id}`}
                            key={subject.id}
                            className="bg-subject-background text-black font-bold text-center p-2 rounded-lg text-wrap w-full h-14 text-sm flex items-center justify-center hover:bg-main-background hover:text-white"
                        >
                            <h3>{subject.name}</h3>
                        </Link>
                    ))}
            </div>
        </section>
    );
};

export default SubjectsSection;
