import { createContext } from "react";

import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
    loading: false,
    query: "",
    results: [],
    setQuery: () => {},
});

export default Context;
