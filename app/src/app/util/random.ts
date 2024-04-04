export class Random {
    static positiveInteger(numberOfDigits: number): number {
        if (numberOfDigits <= 0) {
            throw new Error('Positive integers should consist of at least one digit.');
        }

        let res = this.digit('nonzero');

        for (let i = 1; i < numberOfDigits; i++) {
            res *= 10;
            res += this.digit();
        }

        return res;
    }

    static digit(mode?: 'nonzero'): number {
        const lowerBound = mode === 'nonzero' ? 1 : 0;
        
        return this.between(lowerBound, 10);
    }

    static between(lowerBound: number, upperBound: number): number {
        if (!Number.isInteger(lowerBound) || !Number.isInteger(upperBound)) {
            throw new Error('Only random generation between integer bounds is supported.');
        } else if (lowerBound >= upperBound) {
            throw new Error('Value passed as lower bound is greater than upper bound.');
        }

        return Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound;
    }

    static choice<T>(iterable: Iterable<T>): T {
        const array = Array.from(iterable);
        const index = this.between(0, array.length);

        if (array.length === 0) {
            throw new Error('Unable to choose randomly from empty iterable.');
        }

        return array[index];
    }
}