
export const PAGE_LENGTH = [10, 25, 50, 100];
const sort = {
  Descending: "desc",
  Ascending: "asc",
};
export const FILTER = {
  _page: 1,
  _limit: 10,
  status: "",
  q: "",
  _sort: "id",
  _order: sort.Descending,
};
export const initialState = {
  sortBy: [{ id: "id", desc: true }],
  pageSize: FILTER._limit,
  pageIndex: 0,
};
export const statusOptions = [
  { value: 'Pending', label: 'Pending' },
  { value: 'On Going', label: 'On Going' },
  { value: 'Qued', label: 'Qued' },
  { value: 'Completed', label: 'Completed' },
];
export const projectTypes = [
  { value: '', label: <em>None</em> },
  { value: 'Development', label: 'Development' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Design', label: 'Design' },
  { value: 'Research', label: 'Research' },
];

const auth = JSON.parse(localStorage.getItem('persist:root'))
const authUserReducer = JSON.parse(auth?.authUserReducer)
console.log("🚀 ~ authUserReducer:", authUserReducer.access_token)

export const headers = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authUserReducer?.access_token}`
  }
}