import { Injectable } from '@angular/core';
import { Exercise } from './../domain/exercise';
import { Difficulty } from '../domain/difficulty';

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
