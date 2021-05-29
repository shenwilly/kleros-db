import { PolicyData } from "../../types/Policy";

export interface ContextValues {
    loaded: boolean,
    subcourtToPolicy: Map<string, PolicyData>,
    getCourtPolicy: (subcourtID: string) => PolicyData | null,
    getCourtName: (subcourtID: string) => string,
}
