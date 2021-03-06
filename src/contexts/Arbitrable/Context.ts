import { createContext } from "react";

import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
    arbitrables: [],
    getArbitrableSubmissionURI: async (_) => "",
});

export default Context;
