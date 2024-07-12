import { Injectable } from '@angular/core';
import { Difficulty } from 'domain/difficulty';
import { Operation } from 'domain/operation';

@Injectable({
    providedIn: 'root'
})
export class DifficultyService {
    public lookup(operation: Operation): Difficulty {
        const result = window.localStorage.getItem(operation);

        if (result) {
            const resultDifficulty = Number.parseInt(result, 10);

            for (let difficulty = Difficulty.One; difficulty <= Difficulty.Max; difficulty += 1) {
                if (difficulty === resultDifficulty) {
                    return difficulty;
                }
            }
        }

        return Difficulty.One;
    }

    public set(operation: Operation, difficulty: Difficulty) {
        window.localStorage.setItem(operation, difficulty.toString(10));
    }
}
