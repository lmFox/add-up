import { Injectable } from '@angular/core';
import { Difficulty } from './../domain/difficulty';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    get difficulty(): Difficulty {
        const readItem = window.localStorage.getItem('difficulty');

        return readItem ? parseInt(readItem, 10) : Difficulty.One;
    }

    set difficulty(value: Difficulty) {
        const write = value.toString();
        window.localStorage.setItem('difficulty', write);
    }
}
