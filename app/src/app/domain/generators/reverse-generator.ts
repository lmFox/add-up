import { Difficulty } from "domain/difficulty";
import { Exercise } from "domain/exercise";
import { Operation } from "domain/operation";
import { ExerciseGenerator } from "./exercise-generator";
import { Random } from "util/random";

export class ReverseGenerator implements ExerciseGenerator {
    readonly operation = Operation.Reverse;

    random(difficulty: Difficulty): Exercise {
        const lhs = Random.positiveInteger(difficulty);
        
        return new Exercise(this.operation, lhs, NaN);
    }

}