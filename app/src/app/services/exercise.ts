enum Operation {
    Addition = '+',
    Subtraction = '-',
    Multiplication = '*',
    Division = '/'
}

export enum Difficulty {
    One = 1,
    Two,
    Three,
    Four
}
  
export class Exercise {
    constructor(readonly op: Operation, readonly lhs: number, readonly rhs: number) { }

    static random(difficulty: Difficulty, operation?: Operation): Exercise {
        if (operation === undefined) {
            operation = this.randomOperation();
        }

        const rhs = this.randomNumber(difficulty);
        const lhs = operation === Operation.Division 
        ? this.randomNumber(difficulty) * rhs
        : this.randomNumber(difficulty);

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

    private static randomNumber(numberOfDigits: number): number {
        if (numberOfDigits <= 0) {
            throw new Error('Numbers should consist of at least one digit.');
        }

        let res = this.randomDigit('nonzero');

        for (let i = 1; i < numberOfDigits; i++) {
            res *= 10;
            res += this.randomDigit();
        }

        return res;
    }

    private static randomDigit(mode?: 'nonzero') {
        const lowerBound = mode === 'nonzero' ? 1 : 0;
        const upperBound = 10;

        return Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound;
    }
}