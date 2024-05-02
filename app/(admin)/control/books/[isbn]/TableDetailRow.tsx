import { TableCell, TableRow } from "@mui/material";
import React from "react";
type TableDetailRowProps = {
    field: string;
    value: string | number | undefined | null;
};
const TableDetailRow = ({ field, value }: TableDetailRowProps) => {
    return (
        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell
                sx={{
                    fontWeight: "bold",
                    backgroundColor: "Highlight",
                    color: "HighlightText",
                }}
                width={200}
            >
                {field}
            </TableCell>
            <TableCell>{value || "N/A"}</TableCell>
        </TableRow>
    );
};

export default TableDetailRow;
