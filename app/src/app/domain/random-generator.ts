export class RandomGenerator {
    static number(numberOfDigits: number): number {
        if (numberOfDigits <= 0) {
            throw new Error('Numbers should consist of at least one digit.');
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
        const upperBound = 10;

        return Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound;
    }
}