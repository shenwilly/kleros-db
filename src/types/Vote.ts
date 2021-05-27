import { Juror } from "./Juror";

export type Vote = {
    id: string,
    juror: Juror,
    voted: boolean,
    commit?: string,
    choice: string,

}