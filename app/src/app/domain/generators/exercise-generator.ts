import { Difficulty } from "domain/difficulty";
import { Exercise } from "domain/exercise";

export interface ExerciseGenerator {
    random(difficulty: Difficulty): Exercise;
}

