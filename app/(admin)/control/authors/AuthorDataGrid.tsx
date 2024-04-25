"use client";
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRowParams,
} from "@mui/x-data-grid";
import { Author } from "@prisma/client";
import { FaEye } from "react-icons/fa6";
import { MdDelete, MdEditDocument } from "react-icons/md";
import { deleteAuthor } from "./actions";
import { useToastContext } from "@/app/context/ToastContext";
import Link from "@mui/material/Link";
import { useModalContext } from "@/app/context/ModalContext";
import { useRouter } from "next/navigation";
type AuthorDataGridProps = {
    authors: Author[];
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
            field: "actions",
            headerName: "Actions",
            type: "actions",
            width: 150,
            hideable: false,
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem
                    sx={{ color: "#22c55e", ":hover": { color: "#166534" } }}
                    icon={<FaEye className="text-lg" />}
                    key={params.id}
                    label="Details"
                    onClick={() => {
                        router.push("authors/" + params.id);
                    }}
                />,
                <GridActionsCellItem
                    icon={<MdEditDocument className="text-lg" />}
                    key={params.id}
                    label="Edit"
                    onClick={() => {
                        openModal({
                            formName: "updateAuthor",
                            data: { author: params.row as Author },
                        });
                    }}
                    sx={{
                        color: "#2563EB",
                        ":hover": { color: "#1e40af" },
                    }}
                />,
                <GridActionsCellItem
                    sx={{ color: "#dc2626", ":hover": { color: "#991b1b" } }}
                    icon={<MdDelete className="text-lg" />}
                    key={params.id}
                    label="Delete"
                    onClick={async () => {
                        const response = await deleteAuthor(
                            params.id as string
                        );
                        if (response?.errorMessage) {
                            toastError(response.errorMessage);
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
