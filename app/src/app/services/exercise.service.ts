import { Injectable } from '@angular/core';
import { Exercise, Difficulty } from './exercise';

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {
    private readonly numExercises = 30;

    constructor() { }

    generate(difficulty: Difficulty): Exercise[] {
        let res = [];

        for (let i = 0; i < this.numExercises; i++) {
            res.push(Exercise.random(difficulty));
        }
        
        return res;
    }
}
