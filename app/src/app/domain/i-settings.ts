import { Difficulty } from "./difficulty";

export interface ISettings {
    difficulty?: { [key: string]: Difficulty };
    timerDuration?: number;
};