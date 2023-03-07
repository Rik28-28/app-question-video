import { question } from "./Question";

export interface questions {
    questions: Array<question> | null,
    allAnswered: Boolean
}