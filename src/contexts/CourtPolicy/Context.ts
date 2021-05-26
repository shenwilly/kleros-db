import { createContext } from "react";

import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
    loaded: false,
    subcourtToPolicy: new Map(),
});

export default Context;
