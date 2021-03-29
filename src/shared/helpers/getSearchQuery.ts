import { history } from "router";

export const getSearchQuery = () =>
  new URLSearchParams(history.location.search).get("SearchQuery");
