export const headers = {};
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