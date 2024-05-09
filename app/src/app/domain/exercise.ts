import { Operation } from "./operation";
  
export class Exercise { // FIXME: remove reverse operation from exercise class, ugly solution..
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
        case Operation.Reverse: { // FIXME: ugly.
            const chars = this.lhs.toString(10).split('');
            const reversed = chars.reverse().join('');
            return Number.parseInt(reversed);
        }
        }
    }

    toString(): string {
        if (this.op !== Operation.Reverse) {
            return `${this.lhs} ${this.op} ${this.rhs}`;
        } else {
            return `${this.op} ${this.lhs}`;
        }
    }
}