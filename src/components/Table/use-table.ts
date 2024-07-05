import { useReducer } from "react";
import { Action, State, UseTableReturn } from "./model";

const ROWS_PER_PAGE = 8;

// const filteredRows = useMemo(() => {
//     return data.filter((row) =>
//       row.name.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [data, search]);

//   const currentRows = useMemo(
//     () => filteredRows.slice(startIndex, endIndex),
//     [endIndex, filteredRows, startIndex]
//   );

// Початковий стан
const initialState: State = {
  page: 1,
  rows: [],
  search: "",
  activeRow: null,
  filteredRows: [],
  rowsPerPage: ROWS_PER_PAGE,
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
    case "SET_SEARCH":
      return {
        ...state,
        page: 1,
        search: action.search,
      };

    case "FILTER_ROWS":
      return {
        ...state,
        filteredRows: [...state.rows]
          .filter((row) =>
            row.name.toLowerCase().includes(state.search.toLowerCase())
          )
          .splice((state.page - 1) * state.rowsPerPage, state.rowsPerPage),
      };

    default:
      return state;
  }
};

export const useTable = (
  rows = [],
  rowsPerPage = ROWS_PER_PAGE
): UseTableReturn => {
  const [state, dispatch] = useReducer(reducer, initialState, (state) => ({
    ...state,
    rows,
    rowsPerPage,
    filteredRows: rows,
  }));

  return {
    state,
    dispatch,
  };
};
