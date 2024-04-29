import { Operation } from "domain/operation";
import { BaseGenerator, GenerateOptions } from "./base-generator";
import { Difficulty } from "domain/difficulty";
import { Exercise } from "domain/exercise";

export class DivisionGenerator extends BaseGenerator {
    protected override readonly options = new Map<Difficulty, GenerateOptions[]>([
        [Difficulty.One, [{ lhsSize: 1, rhsSize: 1 }]],
        [Difficulty.Two, [
            { lhsSize: 1, rhsSize: 2 },
            { lhsSize: 2, rhsSize: 1 },
        ]],
        [Difficulty.Three, [
            { lhsSize: 2, rhsSize: 2 },
            { lhsSize: 3, rhsSize: 1 },
            { lhsSize: 1, rhsSize: 3 }
        ]]
    ]);

    override get operation(): Operation {
        return Operation.Division;
    }

    override random(difficulty: Difficulty): Exercise {
        const base = super.random(difficulty);

        // If right hand side is a division by one, regenerate exercise.
        if (base.rhs === 1) {
            return this.random(difficulty);
        }

        // We transform the generated exercise in order to guarantee
        // that the division results in a positive integer answer.
        return new Exercise(this.operation, base.lhs * base.rhs, base.rhs);
    } 
}