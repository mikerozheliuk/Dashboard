export interface DataItem {
  id: number;
  name: string;
  company: string;
  phone: string;
  email: string;
  country: string;
  status: string;
}

export type State = {
  page: number;
  search: string;
  rows: DataItem[];
  filteredRows: DataItem[];
  rowsPerPage: number;
  activeRow: string | null;
};

export type Action =
  | { type: "FILTER_ROWS" }
  | { type: "SET_PAGE"; page: number }
  | { type: "SET_SEARCH"; search: string }
  | { type: "SET_ACTIVE_ROW"; rowName: string };

export interface UseTableReturn {
  state: State;
  dispatch: React.Dispatch<Action>;
}
