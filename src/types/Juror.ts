import { Court } from "./Court";

export type Juror = {
    id: string,
    subCourts?: Court[],
    stakedToken: string,
    lockedToken: string,
}
