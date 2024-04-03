import { Random } from "./random";

describe('Random', () => {
    const numIterations = 10;

    it('should not allow zero or negative digit size for number generation', () => {
        expect(() => Random.number(0)).toThrow();
        expect(() => Random.number(-1)).toThrow();
        expect(() => Random.number(Number.MIN_SAFE_INTEGER)).toThrow();
    });

    it('should generate numbers of specified digit size', () => {
        const digitSize = [1, 3, 5, 7];

        digitSize.forEach(size => {
            const lowerBound = 10**(size-1);
            const upperBound = 10**size;

            for (let i = 0; i < numIterations; i++) {
                boundsChecker(lowerBound, upperBound, Random.number(size));
            }
        });
    });

    it('should generate digits', () => {
        const cases: ('nonzero' | undefined)[] = ['nonzero', undefined];

        cases.forEach(mode => {
            const lowerBound = mode === 'nonzero' ? 1 : 0;
            const upperBound = 10;

            for (let i = 0; i < numIterations; i++) {
                boundsChecker(lowerBound, upperBound, Random.digit(mode));
            }
        });
    });

    function boundsChecker(lowerBound: number, upperBound: number, toCheck: number) {
        expect(toCheck).toBeGreaterThanOrEqual(lowerBound);
        expect(toCheck).toBeLessThan(upperBound);
    }

    it('should throw on incorrect bounds', () => {
        expect(() => Random.between(0.01, 1)).toThrow();
        expect(() => Random.between(0, 1.23)).toThrow();
        expect(() => Random.between(0, Number.NaN)).toThrow();
        expect(() => Random.between(1, 0)).toThrow();
    });

    it('should generate integers between bounds', () => {
        const lowerBound = -5;
        const upperBound = 10;

        for (let i = 0; i < numIterations; i++) {
            const random = Random.between(lowerBound, upperBound);

            expect(random).toBeGreaterThanOrEqual(lowerBound);
            expect(random).toBeLessThan(upperBound);
        }
    });
});