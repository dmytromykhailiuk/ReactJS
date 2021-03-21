import { useLocation } from "react-router";

export function useSearchQuery() {
  return new URLSearchParams(useLocation().search).get("SearchQuery");
}
