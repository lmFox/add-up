import { Difficulty } from "./difficulty";
import { Exercise } from "./exercise";
import { Operation } from "./operation";
import { RandomGenerator } from "./random-generator";

export class Addition {
    static generate(difficulty: Difficulty): Exercise {
        let lhs = 0;
        let rhs = 0;

        for (let numIter = 0; difficulty > 0; difficulty--, numIter++) {
            const mode = numIter == 0 ? 'nonzero' : undefined;

            const leftDigit = RandomGenerator.digit(mode);
            const rightDigit = RandomGenerator.digit(mode);

            const carry = leftDigit + rightDigit >= 10 && numIter > 0;

            if (carry) {
                difficulty--;
            }

            lhs = 10 * lhs + leftDigit;
            rhs = 10 * rhs + rightDigit;
        }

        return new Exercise(Operation.Addition, lhs, rhs);
    }
}