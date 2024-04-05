import { Difficulty } from "domain/difficulty";
import { Exercise } from "domain/exercise";
import { Operation } from "domain/operation";
import { Random } from "util/random";
import { ExerciseGenerator } from "./exercise-generator";

interface IGenerateOptions {
    lhsSize: number;
    rhsSize: number; 
};

export class AdditionGenerator implements ExerciseGenerator{
    private readonly options = new Map<Difficulty, IGenerateOptions[]>([
        [ Difficulty.One, [
            { lhsSize: 1, rhsSize: 1 }, // e.g. 1 + 1
            { lhsSize: 2, rhsSize: 1 } // e.g. 12 + 3
        ]],
        [ Difficulty.Two, [
            { lhsSize: 1, rhsSize: 2 }, // e.g. 3 + 12
            { lhsSize: 2, rhsSize: 2 }, // e.g. 75 + 37
            { lhsSize: 3, rhsSize: 2 } // e.g. 583 + 96
        ]], 
        [ Difficulty.Three, [
            {lhsSize: 2, rhsSize: 3},
            {lhsSize: 3, rhsSize: 3},
            {lhsSize: 4, rhsSize: 3}
        ]]
    ]);

    generate(difficulty: Difficulty): Exercise {
        const genOpts = this.options.get(difficulty);

        if (!genOpts) {
            throw new Error(`Generate options for passed difficulty [${difficulty}] could not be found.`);
        }

        const opt = Random.choice(genOpts);

        const lhs = Random.positiveInteger(opt.lhsSize);
        const rhs = Random.positiveInteger(opt.rhsSize);

        return new Exercise(Operation.Addition, lhs, rhs);
    }
}