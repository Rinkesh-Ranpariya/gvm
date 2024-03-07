import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";
import PropTypes from "prop-types";
import FixedRow from "./FixedRow";

const BaseTable = ({ columns, data, id }) => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    setRowData(data);
  }, [data]);

  return (
    <div className="overflow-x-auto overflow-y-auto">
      <TableContainer component={Paper}>
        <Table id={id} className={`rounded-md`}>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  className="!text-center"
                  key={column.field || index}
                  {...(column.columnProps ?? {})}
                >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.length ? (
              rowData.map((item, rowIndex) => (
                <FixedRow
                  key={`${item.id}-${rowIndex}`}
                  columns={columns}
                  item={item}
                />
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="!text-center !border-none"
                >
                  No Data Available !
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

BaseTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.string,
};

BaseTable.defaultProps = {
  columns: [],
  data: [],
  id: "",
};

export default BaseTable;
