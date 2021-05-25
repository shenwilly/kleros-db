import { useContext } from "react";

import { SearchContext } from "../contexts/Search";

const useSearch = () => {
  return { ...useContext(SearchContext) };
};

export default useSearch;
