import { Operation } from "domain/operation";
import { BaseGenerator } from "./base-generator";
import { Difficulty } from "domain/difficulty";
import { Exercise } from "domain/exercise";

export class DivisionGenerator extends BaseGenerator {
    protected override get operation(): Operation {
        return Operation.Division;
    }

    override random(difficulty: Difficulty): Exercise {
        const base = super.random(difficulty);

        // We transform the generated exercise in order to guarantee
        // that the division results in a positive integer answer.
        return new Exercise(this.operation, base.lhs * base.rhs, base.rhs);
    } 
}