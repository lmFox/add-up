import { Injectable } from '@angular/core';
import { Exercise } from 'domain/exercise';
import { Difficulty } from 'domain/difficulty';
import { AdditionGenerator, ExerciseGenerator } from 'domain/generators';
import { Random } from 'util/random';

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {
    private static readonly NUM_EXERCISES = 30;
    
    private readonly generators: ExerciseGenerator[] = [
        new AdditionGenerator()
    ];

    generate(difficulty: Difficulty): Exercise[] {
        let res = [];

        for (let i = 0; i < ExerciseService.NUM_EXERCISES; i++) {
            res.push(this.getRandomExercise(difficulty));
        }
        
        return res;
    }

    private getRandomExercise(difficulty: Difficulty): Exercise {
        const generator = Random.choice(this.generators);

        return generator.random(difficulty);
    }
}
