import { Exercise } from "./exercise";
import { Operation } from "./operation";

describe('Exercise', () => {
    it('should calculate correct answers', () => {
        expect(new Exercise(Operation.Addition, 1, 2).answer()).toBe(3);
        expect(new Exercise(Operation.Subtraction, 7, 3).answer()).toBe(4);
        expect(new Exercise(Operation.Multiplication, 2, 3).answer()).toBe(6);
        expect(new Exercise(Operation.Division, 12, 6).answer()).toBe(2);
        expect(new Exercise(Operation.Reverse, 123, NaN).answer()).toBe(321);
    });
});