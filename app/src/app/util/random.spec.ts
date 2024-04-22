import { Random } from "./random";

describe('Random', () => {
    const NUM_ITERATIONS = 300;

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

            for (let i = 0; i < NUM_ITERATIONS; i++) {
                const gen = Random.positiveInteger(size);
                expect(gen).toBeGreaterThanOrEqual(lowerBound);
                expect(gen).toBeLessThan(upperBound);
            }
        });
    });

    it('should generate digits', () => {
        checkSufficientlyRandomAndDomain(() => Random.digit(), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        checkSufficientlyRandomAndDomain(() => Random.digit('nonzero'), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('should throw on incorrect bounds', () => {
        expect(() => Random.between(0.01, 1)).toThrow();
        expect(() => Random.between(0, 1.23)).toThrow();
        expect(() => Random.between(0, Number.NaN)).toThrow();
        expect(() => Random.between(1, 0)).toThrow();
    });

    it('should generate integers between bounds', () => {
        const lowerBound = -2
        const upperBound = 9;
        const range = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8];

        checkSufficientlyRandomAndDomain(() => Random.between(lowerBound, upperBound), range);
    });

    it('should throw errors when requesting random choice from empty iterable', () => {
        expect(() => Random.choice([])).toThrow();

        const domainRange = [1, 2, 3, 4, 5];
        checkSufficientlyRandomAndDomain(() => Random.choice(domainRange), domainRange);
    });

    function checkSufficientlyRandomAndDomain<T>(randomValueGenerator: (() => T), range: T[]) {
        const frequencies = checkSufficientlyRandom(randomValueGenerator);

        const generated = new Set(frequencies.keys());

        range.forEach(value => {
            expect(generated.has(value)).toBeTrue();
            generated.delete(value);
        });
    }

    function checkSufficientlyRandom<T>(randomValueGenerator: (() => T)): Map<T, number> {
        const values = [];
        for (let i = 0; i < NUM_ITERATIONS; i++) {
            values.push(randomValueGenerator());
        }

        const frequencies = frequencyCount(values);
        checkUniformness(frequencies);

        return frequencies;
    }

    function frequencyCount<T>(iter: Iterable<T>): Map<T, number> {
        const result = new Map<T, number>();

        for (const key of iter) {
            const count = result.has(key) ? result.get(key)! + 1 : 1;
            result.set(key, count);
        }

        return result;
    }

    function checkUniformness<T>(frequencies: Map<T, number>) {
        const counts = Array.from(frequencies.values());
        const total = counts.reduce((sum, number) => sum + number, 0);

        counts.forEach(count => {
            const observedRatio = count / total;
            const expectedRatio = 1 / counts.length;

            expect(observedRatio).toBeCloseTo(expectedRatio, 1);
        });
    }
});