import { useReducer, useMemo } from "react";
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

import classNames from "classnames";

import { rows } from "./data";

import styles from "./tablePage.module.scss";

const ROWS_PER_PAGE = 8;

const getStatusClass = (status: string) => {
  return status === "active" ? styles.activeStatus : styles.inactiveStatus;
};

// Визначення типів для стану та дій
type State = {
  page: number;
  activeRow: string | null;
};

type Action =
  | { type: "SET_PAGE"; page: number }
  | { type: "SET_ACTIVE_ROW"; rowName: string };

// Початковий стан
const initialState: State = {
  page: 1,
  activeRow: null,
};

// Редюсер функція
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PAGE":
      return {
        ...state,
        page: action.page,
      };
    case "SET_ACTIVE_ROW":
      return {
        ...state,
        activeRow: action.rowName,
      };
    default:
      return state;
  }
};

interface TablePageProps {
  searchQuery: string;
}

export const TablePage: React.FC<TablePageProps> = ({ searchQuery }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { page, activeRow } = state;

  const startIndex = (page - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;

  const filteredRows = useMemo(() => {
    return rows.filter((row) =>
      row.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const currentRows = useMemo(
    () => filteredRows.slice(startIndex, endIndex),
    [filteredRows, page]
  );

  const handleChangePage = (_event: React.ChangeEvent<unknown>, newPage: number) => {
    dispatch({ type: "SET_PAGE", page: newPage });
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
              <TableCell className={styles.table__title}>Customer Name</TableCell>
              <TableCell className={styles.table__title}>Company</TableCell>
              <TableCell className={styles.table__title}>Phone Number</TableCell>
              <TableCell className={styles.table__title}>Email</TableCell>
              <TableCell className={styles.table__title}>Country</TableCell>
              <TableCell className={styles.table__title}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.length > 0 ? (
              currentRows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => handleRowClick(row.name)}
                  className={classNames({ [styles.activeRow]: activeRow === row.name })}
                >
                  <TableCell className={styles.table__cell} component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell className={styles.table__cell}>{row.company}</TableCell>
                  <TableCell className={styles.table__cell}>{row.phone}</TableCell>
                  <TableCell className={styles.table__cell}>{row.email}</TableCell>
                  <TableCell className={styles.table__cell}>{row.country}</TableCell>
                  <TableCell className={classNames(styles.table__cell, styles.status)}>
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
                <TableCell colSpan={6} className={styles.table__cell} align="center">
                  введіть коректно
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pagination}>
        <div className={styles.pagination__info}>
          Showing data {startIndex + 1} to {Math.min(endIndex, filteredRows.length)} of{" "}
          {filteredRows.length} entries
        </div>
        <Pagination
          count={Math.ceil(filteredRows.length / ROWS_PER_PAGE)}
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
