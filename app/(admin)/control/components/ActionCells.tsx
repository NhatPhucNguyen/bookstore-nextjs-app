import { GridActionsCellItem, GridRowId } from "@mui/x-data-grid";
import { Author } from "@prisma/client";
import React from "react";
import { FaEye } from "react-icons/fa6";
import { MdDelete, MdEditDocument } from "react-icons/md";
type ActionCellProps = {
    key: GridRowId;
    onClick: () => void;
};
export const ViewActionCell = ({ key, onClick }: ActionCellProps) => {
    return (
        <GridActionsCellItem
            sx={{ color: "#22c55e", ":hover": { color: "#166534" } }}
            icon={<FaEye className="text-lg" />}
            key={key}
            label="Details"
            onClick={onClick}
        />
    );
};
export const EditActionCell = ({ key, onClick }: ActionCellProps) => {
    return <GridActionsCellItem
        icon={<MdEditDocument className="text-lg" />}
        key={key}
        label="Edit"
        onClick={onClick}
        sx={{
            color: "#2563EB",
            ":hover": { color: "#1e40af" },
        }}
    />;
};
export const DeleteActionCell = ({ key, onClick }: ActionCellProps) => {
    return <GridActionsCellItem
        sx={{ color: "#dc2626", ":hover": { color: "#991b1b" } }}
        icon={<MdDelete className="text-lg" />}
        key={key}
        label="Delete"
        onClick={onClick}
    />;
};
