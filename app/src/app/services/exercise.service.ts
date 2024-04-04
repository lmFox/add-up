import { Injectable } from '@angular/core';
import { Exercise } from '../domain/exercise';
import { Difficulty } from '../domain/difficulty';
import { Operation } from '../domain/operation';
import { AdditionGenerator, ExerciseGenerator } from '../domain/generators';
import { Random } from '../util/random';

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {
    private static readonly NUM_EXERCISES = 30;
    
    private readonly generators = new Map<Operation, ExerciseGenerator>([
        [ Operation.Addition, new AdditionGenerator() ]
    ]);

    generate(difficulty: Difficulty): Exercise[] {
        let res = [];

        for (let i = 0; i < ExerciseService.NUM_EXERCISES; i++) {
            res.push(this.getRandomExercise(difficulty));
        }
        
        return res;
    }

    private getRandomExercise(difficulty: Difficulty): Exercise {
        const operation = Random.choice(this.generators.keys());
        const generator = this.generators.get(operation);

        return generator!.generate(difficulty);
    }
}
