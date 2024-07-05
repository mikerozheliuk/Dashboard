import { useMemo } from "react";
import classNames from "classnames";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";

import { UseTableReturn } from "./model";

import styles from "./table-page.module.scss";

const getStatusClass = (status: string) => {
  return status === "active" ? styles.activeStatus : styles.inactiveStatus;
};

export const MyTable: React.FC<UseTableReturn> = ({ state, dispatch }) => {
  const { rows, filteredRows, rowsPerPage, page, activeRow } = state;

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    dispatch({ type: "SET_PAGE", page: newPage });
    dispatch({ type: "FILTER_ROWS" });
  };

  const handleRowClick = (rowName: string) => {
    dispatch({ type: "SET_ACTIVE_ROW", rowName });
  };

  return (
    <>
      <TableContainer className={styles.table} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={styles.table__title}>
                Customer Name
              </TableCell>
              <TableCell className={styles.table__title}>Company</TableCell>
              <TableCell className={styles.table__title}>
                Phone Number
              </TableCell>
              <TableCell className={styles.table__title}>Email</TableCell>
              <TableCell className={styles.table__title}>Country</TableCell>
              <TableCell className={styles.table__title}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.length > 0 ? (
              filteredRows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => handleRowClick(row.name)}
                  className={classNames({
                    [styles.activeRow]: activeRow === row.name,
                  })}
                >
                  <TableCell
                    className={styles.table__cell}
                    component="th"
                    scope="row"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell className={styles.table__cell}>
                    {row.company}
                  </TableCell>
                  <TableCell className={styles.table__cell}>
                    {row.phone}
                  </TableCell>
                  <TableCell className={styles.table__cell}>
                    {row.email}
                  </TableCell>
                  <TableCell className={styles.table__cell}>
                    {row.country}
                  </TableCell>
                  <TableCell
                    className={classNames(styles.table__cell, styles.status)}
                  >
                    <div
                      className={classNames(
                        styles.status__button,
                        getStatusClass(row.status)
                      )}
                    >
                      {row.status}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className={styles.table__cell}
                  align="center"
                >
                  введіть коректно
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pagination}>
        <div className={styles.pagination__info}>
          Showing data {startIndex + 1} to {Math.min(endIndex, rows.length)} of{" "}
          {rows.length} entries
        </div>
        <Pagination
          count={Math.ceil(rows.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
          size="small"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#404B52",

              "&.Mui-selected": {
                backgroundColor: "#5932EA",
                color: "white",
                border: "#5932EA",
              },
            },
          }}
        />
      </div>
    </>
  );
};
