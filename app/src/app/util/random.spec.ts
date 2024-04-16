import { Random } from "./random";

describe('Random', () => {
    const numIterations = 10;

    it('should not allow zero or negative digit size for number generation', () => {
        expect(() => Random.positiveInteger(0)).toThrow();
        expect(() => Random.positiveInteger(-1)).toThrow();
        expect(() => Random.positiveInteger(Number.MIN_SAFE_INTEGER)).toThrow();
    });

    it('should generate positive integers of specified digit size', () => {
        const digitSize = [1, 3, 5, 7];

        digitSize.forEach(size => {
            const lowerBound = 10**(size-1);
            const upperBound = 10**size;

            for (let i = 0; i < numIterations; i++) {
                boundsChecker(lowerBound, upperBound, Random.positiveInteger(size));
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

    it('should throw errors when requesting random choice from empty iterable', () => {
        expect(() => Random.choice([])).toThrow();

        expect(checkSufficientlyRandom(() => Random.choice([1, 2, 3]))).toBeTrue();
    });

    function checkSufficientlyRandom<T>(randomValueGenerator: (() => T)): boolean {
        const NUM_ITERATIONS = 300;
        
        const result = new Map<T, number>();

        // Generate count mapping.
        for (let i = 0; i < NUM_ITERATIONS; i++) {
            const key = randomValueGenerator();
            const count = result.has(key) ? result.get(key)! + 1 : 1;
            result.set(key, count);
        }

        // Determine "randomness" by checking whether count is more or less uniform.
        const counts = Array.from(result.values());
        counts.forEach(count => {
            const occurenceRatio = count / NUM_ITERATIONS;
            const expectedRatio = 1 / counts.length;

            expect(occurenceRatio).toBeCloseTo(expectedRatio, 1);
        });

        return true;
    }
});