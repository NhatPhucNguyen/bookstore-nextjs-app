"use client";
import { useModalContext } from "@/app/context/ModalContext";
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRowParams,
} from "@mui/x-data-grid";
import { Subject } from "@prisma/client";
import { MdEditDocument } from "react-icons/md";
import { DeleteActionCell, EditActionCell } from "../components/ActionCells";
import { deleteSubject } from "./actions";
import { useToastContext } from "@/app/context/ToastContext";
const SubjectDataGrid = ({ subjects }: { subjects: Subject[] }) => {
    const { openModal } = useModalContext();
    const { toastError, toastSuccess } = useToastContext();
    const cols: GridColDef[] = [
        { field: "name", headerName: "Name", hideable: false, width: 150 },
        { field: "description", headerName: "Description", flex: 1 },
        {
            field: "updatedAt",
            headerName: "Updated At",
            width: 200,
            valueFormatter: (val: string) =>
                new Date(val).toLocaleTimeString() +
                " | " +
                new Date(val).toLocaleDateString(),
        },
        {
            field: "id",
            type: "actions",
            headerName: "Actions",
            width: 150,
            hideable: false,
            resizable: false,
            getActions: (params: GridRowParams) => [
                <EditActionCell
                    key={params.id}
                    onClick={() => {
                        openModal({
                            formName: "updateSubject",
                            data: { subject: params.row as Subject },
                        });
                    }}
                />,
                <DeleteActionCell
                    key={params.id}
                    onClick={async () => {
                        const { error } = await deleteSubject(
                            params.id as string
                        );
                        if (error) {
                            return toastError(error.message);
                        }
                        toastSuccess("Subject deleted successfully");
                    }}
                />,
            ],
        },
    ];
    return (
        <DataGrid
            rows={subjects}
            columns={cols}
            localeText={{ noRowsLabel: "No subjects found" }}
            sx={{ height: 450, width: "100%" }}
        ></DataGrid>
    );
};

export default SubjectDataGrid;
