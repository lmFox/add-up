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
                return Difficulty.Four;
            case Operation.Subtraction:
                return Difficulty.Four;
            case Operation.Multiplication:
                return Difficulty.Three;
            case Operation.Division:
                return Difficulty.Two;
        }
    }
}
