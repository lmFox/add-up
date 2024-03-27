import { RandomGenerator } from "./random-generator";
import { Operation } from "./operation";
import { Difficulty } from "./difficulty";
  
export class Exercise {
    constructor(readonly op: Operation, readonly lhs: number, readonly rhs: number) { }

    static random(difficulty: Difficulty, operation?: Operation): Exercise {
        if (operation === undefined) {
            operation = this.randomOperation();
        }

        const rhs = RandomGenerator.number(difficulty);
        const lhs = operation === Operation.Division 
        ? RandomGenerator.number(difficulty) * rhs
        : RandomGenerator.number(difficulty);

        return new Exercise(operation, lhs, rhs);
    }

    answer(): number {
        switch(this.op) {
        case Operation.Addition:
            return this.lhs + this.rhs;
        case Operation.Subtraction:
            return this.lhs - this.rhs;
        case Operation.Multiplication:
            return this.lhs * this.rhs;
        case Operation.Division:
            return this.lhs / this.rhs;
        }
    }

    toString(): string {
        return `${this.lhs} ${this.op} ${this.rhs}`;
    }

    private static randomOperation(): Operation {
        const operations = [
            Operation.Addition,
            Operation.Subtraction,
            Operation.Multiplication,
            Operation.Division
        ];

        const idx = Math.floor(Math.random() * operations.length);
        return operations[idx];
    }
}