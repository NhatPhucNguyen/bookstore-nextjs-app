"use client";
import { useModalContext } from "@/app/context/ModalContext";
import { useToastContext } from "@/app/context/ToastContext";
import Link from "@mui/material/Link";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Author, Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
    DeleteActionCell,
    EditActionCell,
    ViewActionCell,
} from "../components/ActionCells";
import { deleteAuthor } from "./actions";
type AuthorDataGridProps = {
    authors: Prisma.AuthorGetPayload<{
        include: { _count: { select: { books: true } } };
    }>[];
};
const AuthorDataGrid = ({ authors }: AuthorDataGridProps) => {
    const { toastSuccess, toastError } = useToastContext();
    const { openModal } = useModalContext();
    const router = useRouter();
    const cols: GridColDef[] = [
        { field: "name", headerName: "Name", width: 150, hideable: false },
        {
            field: "bio",
            headerName: "Bio",
            width: 150,
            valueFormatter: (val: string) => val || "N/A",
        },
        {
            field: "imageUrl",
            headerName: "Image",
            width: 150,
            renderCell: (params) => {
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
            field: "updatedAt",
            headerName: "Updated At",
            width: 100,
            valueFormatter: (val: string) =>
                new Date(val).toLocaleTimeString() +
                " | " +
                new Date(val).toLocaleDateString(),
        },
        {
            field: "_count",
            headerName: "Books",
            width: 100,
            valueGetter: (params: { books: number }) => params.books,
        },
        {
            field: "actions",
            headerName: "Actions",
            type: "actions",
            width:150,
            hideable: false,
            resizable:false,
            getActions: (params: GridRowParams) => [
                <ViewActionCell
                    key={params.id}
                    onClick={() => {
                        router.push("authors/" + params.id);
                    }}
                />,
                <EditActionCell
                    key={params.id}
                    onClick={() => {
                        openModal({
                            formName: "updateAuthor",
                            data: { author: params.row as Author },
                        });
                    }}
                />,
                <DeleteActionCell
                    key={params.id}
                    onClick={async () => {
                        const { error } = await deleteAuthor(
                            params.id as string
                        );
                        if (error) {
                            toastError(error.message);
                            return;
                        }
                        toastSuccess("Author deleted successfully!");
                    }}
                />,
            ],
        },
    ];
    return (
        <DataGrid
            rows={authors}
            columns={cols}
            sx={{ height: 500, width: "100%" }}
            autoPageSize
            localeText={{ noRowsLabel: "No authors found" }}
        />
    );
};
export default AuthorDataGrid;
