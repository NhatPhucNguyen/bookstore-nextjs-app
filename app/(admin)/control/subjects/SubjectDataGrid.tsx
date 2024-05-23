"use client";
import { useModalContext } from "@/app/context/ModalContext";
import { useToastContext } from "@/app/context/ToastContext";
import {
    DataGrid,
    GridColDef,
    GridRowParams
} from "@mui/x-data-grid";
import { Prisma, Subject } from "@prisma/client";
import { DeleteActionCell, EditActionCell } from "../components/ActionCells";
import { deleteSubject } from "@/app/actions/subjectActions";
type SubjectDataGridProps = {
    subjects: Prisma.SubjectGetPayload<{
        include: { _count: { select: { books: true } } };
    }>[];
};
const SubjectDataGrid = ({ subjects }: SubjectDataGridProps) => {
    const { openModal } = useModalContext();
    const { toastError, toastSuccess } = useToastContext();
    const cols: GridColDef[] = [
        { field: "name", headerName: "Name", hideable: false, width: 150 },
        {
            field: "_count",
            headerName: "Books",
            width: 100,
            valueGetter: (params: { books: number }) => params.books,
        },
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
            width:100,
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
            sx={{ height: 500, width: "100%" }}
        ></DataGrid>
    );
};

export default SubjectDataGrid;
