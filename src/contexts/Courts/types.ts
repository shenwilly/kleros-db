import { PolicyData } from "../../types/Policy";

export interface ContextValues {
    loaded: boolean,
    subcourtToPolicy: Map<string, PolicyData>
}
