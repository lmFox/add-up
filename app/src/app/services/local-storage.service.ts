import { Injectable } from '@angular/core';
import { Difficulty } from './exercise';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    get difficulty(): Difficulty {
        const read = window.localStorage.getItem('difficulty');

        const result = parseInt(read ?? '', 10);

        if (Difficulty.One <= result && result <= Difficulty.Max) {
            return result;
        } else {
            return Difficulty.One;
        }
    }

    set difficulty(value: Difficulty) {
        const write = value.toString();
        window.localStorage.setItem('difficulty', write);
    }
}
