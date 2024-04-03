import { Difficulty } from "../difficulty";
import { Exercise } from "../exercise";

export interface ExerciseGenerator {
    generate(difficulty: Difficulty): Exercise;
}

