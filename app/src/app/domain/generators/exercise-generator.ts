import { Difficulty } from "domain/difficulty";
import { Exercise } from "domain/exercise";
import { Operation } from "domain/operation";

export interface ExerciseGenerator {
    operation: Operation;
    random(difficulty: Difficulty): Exercise;
    warmup(): Exercise;
}

