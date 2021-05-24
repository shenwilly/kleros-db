import { createContext } from "react";

import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
    subcourtToPolicy: new Map()
});

export default Context;
