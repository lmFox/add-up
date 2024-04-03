import { Injectable } from '@angular/core';
import { Exercise } from '../domain/exercise';
import { Difficulty } from '../domain/difficulty';
import { Operation } from '../domain/operation';
import { AdditionGenerator, ExerciseGenerator } from '../domain/generators';

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {
    private readonly numExercises = 30;
    private readonly generators = new Map<Operation, ExerciseGenerator>([
        [ Operation.Addition, new AdditionGenerator() ]
    ]);

    generate(difficulty: Difficulty): Exercise[] {
        let res = [];

        for (let i = 0; i < this.numExercises; i++) {
            res.push(this.random(difficulty));
        }
        
        return res;
    }

    random(difficulty: Difficulty, operation?: Operation): Exercise {
        if (operation === undefined) {
            operation = this.randomOperation();
        }

        const generator = this.generators.get(operation);

        if (!generator) {
            throw new Error('The requested opertion is not supported.');
        }

        return generator.generate(difficulty);
    }

    private randomOperation(): Operation {
        const operations = [
            Operation.Addition,
            // Operation.Subtraction,
            // Operation.Multiplication,
            // Operation.Division
        ];

        const idx = Math.floor(Math.random() * operations.length);
        return operations[idx];
    }
}
