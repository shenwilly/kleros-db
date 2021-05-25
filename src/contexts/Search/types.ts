import { Dispute } from "../../types/Dispute";

export interface ContextValues {
    loading: boolean,
    query: string,
    results: Dispute[],
    setQuery: (query: string) => void;
}
