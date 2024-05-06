"use client";
import { Subject } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PiCircleNotchBold } from "react-icons/pi";
import ReactSelect from "react-select";

const SubjectFilter = ({ subjects }: { subjects: Subject[] }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const foundSubject = subjects.find(
        (subject) => subject.id === searchParams.get("subject")
    );
    return (
        <section>
            {/* Mobile filter */}
            <ReactSelect
                placeholder="Subjects"
                options={subjects
                    .map((subject) => ({
                        label: subject.name,
                        value: subject.id,
                    }))
                    .concat({ label: "All", value: "all" })}
                className="text-black mt-2 md:hidden"
                id="subject-filter"
                onChange={(option) => {
                    const params = new URLSearchParams(searchParams);
                    if (option === null || option.value === "all") {
                        params.delete("subject");
                    } else {
                        params.set("subject", option.value);
                    }
                    replace(`${pathname}?${params.toString()}`);
                }}
                defaultValue={
                    foundSubject === undefined
                        ? { label: "All", value: "all" }
                        : { label: foundSubject.name, value: foundSubject.id }
                }
            />
            {/* Desktop filter */}
            <ul className="hidden md:block pl-4 [&>li]:mt-2 [&>li]:hover:cursor-pointer [&>li]:">
                <li
                    className={`${
                        searchParams.get("subject") === null
                            ? "text-secondary"
                            : "text-gray-800"
                    } mt-2 hover:text-secondary`}
                    onClick={() => {
                        // Remove subject filter
                        const params = new URLSearchParams(searchParams);
                        params.delete("subject");
                        replace(`${pathname}?${params.toString()}`);
                    }}
                >
                    {searchParams.get("subject") === null ? (
                        <IoMdCheckmarkCircleOutline className="inline-block" />
                    ) : (
                        <PiCircleNotchBold className="inline-block" />
                    )}{" "}
                    All Subjects
                </li>
                {subjects.map((subject) => (
                    <li
                        key={subject.id}
                        className={`${
                            searchParams.get("subject") === subject.id
                                ? "text-secondary"
                                : "text-gray-800"
                        } hover:text-secondary`}
                        onClick={() => {
                            // Filter books by subject
                            const params = new URLSearchParams(searchParams);
                            params.set("subject", subject.id);
                            replace(`${pathname}?${params.toString()}`);
                        }}
                    >
                        {searchParams.get("subject") === subject.id ? (
                            <IoMdCheckmarkCircleOutline className="inline-block" />
                        ) : (
                            <PiCircleNotchBold className="inline-block" />
                        )}{" "}
                        {subject.name}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default SubjectFilter;
