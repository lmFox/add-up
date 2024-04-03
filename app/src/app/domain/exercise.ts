import { Operation } from "./operation";
  
export class Exercise {
    constructor(readonly op: Operation, readonly lhs: number, readonly rhs: number) { }

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
}