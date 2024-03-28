import { RandomGenerator } from "./random-generator";

describe('RandomGenerator', () => {
    const numIterations = 10;

    it('should not allow zero or negative digit size for number generation', () => {
        expect(() => RandomGenerator.number(0)).toThrow();
        expect(() => RandomGenerator.number(-1)).toThrow();
        expect(() => RandomGenerator.number(Number.MIN_SAFE_INTEGER)).toThrow();
    });

    it('should generate numbers of specified digit size', () => {
        const digitSize = [1, 3, 5, 7];

        digitSize.forEach(size => {
            const lowerBound = 10**(size-1);
            const upperBound = 10**size;

            for (let i = 0; i < numIterations; i++) {
                boundsChecker(lowerBound, upperBound, RandomGenerator.number(size));
            }
        });
    });

    it('should generate digits', () => {
        const cases: ('nonzero' | undefined)[] = ['nonzero', undefined];

        cases.forEach(mode => {
            const lowerBound = mode === 'nonzero' ? 1 : 0;
            const upperBound = 10;

            for (let i = 0; i < numIterations; i++) {
                boundsChecker(lowerBound, upperBound, RandomGenerator.digit(mode));
            }
        });
    });

    function boundsChecker(lowerBound: number, upperBound: number, toCheck: number) {
        expect(toCheck).toBeGreaterThanOrEqual(lowerBound);
        expect(toCheck).toBeLessThan(upperBound);
    }
});