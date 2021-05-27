import { Court } from "./Court";

export type Juror = {
  subCourts?: Court[],
  stakedToken: string,
  lockedToken: string,
}