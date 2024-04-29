import { Operation } from "domain/operation";
import { BaseGenerator, GenerateOptions } from "./base-generator";
import { Difficulty } from "domain/difficulty";

export class MultiplicationGenerator extends BaseGenerator {
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
        return Operation.Multiplication;
    }
}