"use client";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Author, Book, Prisma, Subject } from "@prisma/client";
import React from "react";
import {
    DeleteActionCell,
    EditActionCell,
    ViewActionCell,
} from "../components/ActionCells";
import { useToastContext } from "@/app/context/ToastContext";
import { deleteBook } from "./actions";
import { Link } from "@mui/material";
import { useModalContext } from "@/app/context/ModalContext";
import { useRouter } from "next/navigation";
export type BookDetails = Prisma.BookGetPayload<{
    include: {
        subjects: true;
        authors: true;
        reviews: true;
    };
}>;
type BookDataGridProps = {
    books: BookDetails[];
};
const BookDataGrid = ({ books }: BookDataGridProps) => {
    const { toastError, toastSuccess } = useToastContext();
    const { openModal } = useModalContext();
    const router = useRouter();
    const cols: GridColDef[] = [
        { field: "isbn", headerName: "ISBN", width: 150, hideable: false },
        { field: "title", headerName: "Title", width: 150, hideable: false },
        {
            field: "description",
            headerName: "Description",
            valueFormatter: (params: string) => params || "N/A",
            width: 150,
        },
        {
            field: "publishedDate",
            headerName: "Published Date",
            valueFormatter: (params: Date) =>
                params && params.toLocaleDateString(),
            width: 150,
        },
        {
            field: "imageUrl",
            headerName: "Cover Image URL",
            renderCell: (params) => {
                console.log(params);
                return params.value ? (
                    <Link href={params.value} target="_blank">
                        {params.value}
                    </Link>
                ) : (
                    <span>N/A</span>
                );
            },
        },
        {
            field: "subjects",
            headerName: "Subjects",
            width: 150,
            valueGetter: (params: Subject[]) => {
                return params.map((subject) => subject.name).join(", ");
            },
        },
        {
            field: "authors",
            headerName: "Authors",
            width: 150,
            valueGetter: (params: Author[]) => {
                return params.map((subject) => subject.name).join(", ");
            },
        },
        {
            field: "discount",
            headerName: "Discount",
            width: 150,
            valueFormatter: (params: number) => `${params}%`,
        },
        {
            field: "price",
            headerName: "Price",
            width: 150,
            renderCell: ({
                row,
            }: {
                row: { discount: number; price: number };
            }) => {
                return (
                    <>
                        <span>${row.price.toFixed(2)}</span>
                        {" | "}
                        <span className="text-green-500">
                            $
                            {((row.price * (100 - row.discount)) / 100).toFixed(
                                2
                            )}
                        </span>
                    </>
                );
            },
        },
        { field: "quantity", headerName: "Quantity", width: 150 },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 150,
            hideable: false,
            getActions: (params: GridRowParams) => [
                <ViewActionCell
                    key={params.id}
                    onClick={() => {
                        router.push(`/control/books/${params.id}`);
                    }}
                />,
                <EditActionCell
                    key={params.id}
                    onClick={async () => {
                        openModal({
                            formName: "updateBook",
                            data: { book: params.row as BookDetails },
                        });
                    }}
                />,
                <DeleteActionCell
                    key={params.id}
                    onClick={async () => {
                        const { error } = await deleteBook(params.id as string);
                        if (error) {
                            toastError(error.message);
                        } else {
                            toastSuccess("Book deleted successfully");
                        }
                    }}
                />,
            ],
        },
    ];
    return (
        <DataGrid
            rows={books.map((book) => ({ ...book, id: book.isbn }))}
            columns={cols}
            localeText={{ noRowsLabel: "No subjects found" }}
            sx={{ height: 500, width: "100%" }}
        ></DataGrid>
    );
};

export default BookDataGrid;
