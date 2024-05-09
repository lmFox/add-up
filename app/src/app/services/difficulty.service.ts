import { Injectable } from '@angular/core';
import { Difficulty } from 'domain/difficulty';
import { Operation } from 'domain/operation';

@Injectable({
    providedIn: 'root'
})
export class DifficultyService {
    public lookup(operation: Operation): Difficulty {
        switch(operation) {
            case Operation.Addition:
                return Difficulty.Three;
            case Operation.Subtraction:
                return Difficulty.Three;
            case Operation.Multiplication:
                return Difficulty.Two;
            case Operation.Division:
                return Difficulty.Two;
            case Operation.Reverse:
                return Difficulty.Five;
        }
    }
}
