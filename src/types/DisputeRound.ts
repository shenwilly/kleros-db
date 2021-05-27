import { Vote } from "./Vote";

export type DisputeRound = {
    id: string,
    round?: string,
    voteCount?: string,
    votes?: Vote[],
}