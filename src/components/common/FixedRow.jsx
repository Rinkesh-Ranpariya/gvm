import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { TableCell, TableRow } from "@mui/material";

const FixedRow = ({ columns, item }) => {
  const rowProps = item.id ? { id: item.id } : {};

  return (
    <>
      <TableRow {...rowProps}>
        {columns.map((column, index) => (
          <TableCell key={column.field || index} className="!text-center">
            {column.field
              ? get(item, column.field) ?? "--"
              : column.renderCell && column.renderCell(item)}
          </TableCell>
        ))}
      </TableRow>
    </>
  );
};

FixedRow.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  item: PropTypes.object,
};

export default FixedRow;
