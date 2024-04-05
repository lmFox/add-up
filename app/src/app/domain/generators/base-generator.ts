import { Difficulty } from "domain/difficulty";
import { Exercise } from "domain/exercise";
import { ExerciseGenerator } from "./exercise-generator";
import { Operation } from "domain/operation";
import { Random } from "util/random";

export interface GenerateOptions {
    lhsSize: number;
    rhsSize: number; 
}

export class BaseGenerator implements ExerciseGenerator {
    protected readonly options = new Map<Difficulty, GenerateOptions[]>([
        [ Difficulty.One, [
            { lhsSize: 1, rhsSize: 1 },
            { lhsSize: 2, rhsSize: 1 }
        ]],
        [ Difficulty.Two, [
            { lhsSize: 1, rhsSize: 2 },
            { lhsSize: 2, rhsSize: 2 },
            { lhsSize: 3, rhsSize: 2 }
        ]], 
        [ Difficulty.Three, [
            {lhsSize: 2, rhsSize: 3},
            {lhsSize: 3, rhsSize: 3},
            {lhsSize: 4, rhsSize: 3}
        ]]
    ]);

    protected get operation(): Operation {
        throw new Error('Property get operation not implemented.');
    }

    random(difficulty: Difficulty): Exercise {
        const genOpts = this.options.get(difficulty);

        if (!genOpts) {
            throw new Error(`Generate options for passed difficulty [${difficulty}] could not be found.`);
        }

        const opt = Random.choice(genOpts);

        const lhs = Random.positiveInteger(opt.lhsSize);
        const rhs = Random.positiveInteger(opt.rhsSize);

        return new Exercise(this.operation, lhs, rhs);
    }
}