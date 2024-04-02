import { Difficulty } from "./difficulty";
import { Exercise } from "./exercise";
import { Operation } from "./operation";
import { RandomGenerator } from "./random-generator";

interface IGenerateOptions {
    lhsSize: number;
    rhsSize: number; 
};

export class Addition {
    private static readonly options = new Map<Difficulty, IGenerateOptions>([
        [ Difficulty.One, { lhsSize: 1, rhsSize: 1 } ], // e.g. 1 + 1
        [ Difficulty.One, { lhsSize: 2, rhsSize: 1 } ], // e.g. 12 + 3
        [ Difficulty.Two, { lhsSize: 1, rhsSize: 2 } ], // e.g. 3 + 12
        [ Difficulty.Two, { lhsSize: 2, rhsSize: 2 } ], // e.g. 75 + 37
        [ Difficulty.Two, { lhsSize: 3, rhsSize: 2 } ], // e.g. 583 + 96
        [ Difficulty.Three, {lhsSize: 2, rhsSize: 3} ],
        [ Difficulty.Three, {lhsSize: 3, rhsSize: 3} ],
        [ Difficulty.Three, {lhsSize: 4, rhsSize: 3} ],
    ]);

    static generate(difficulty: Difficulty): Exercise {
        const genOpts = this.options.get(difficulty);

        if (!genOpts) {
            throw new Error(`Generate options for passed difficulty [${difficulty}] could not be found.`);
        }

        const lhs = RandomGenerator.number(genOpts.lhsSize);
        const rhs = RandomGenerator.number(genOpts.rhsSize);

        return new Exercise(Operation.Addition, lhs, rhs);
    }
}