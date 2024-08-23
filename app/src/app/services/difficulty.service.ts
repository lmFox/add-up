import { Injectable } from '@angular/core';
import { Difficulty } from 'domain/difficulty';
import { Operation } from 'domain/operation';
import { ISettings } from 'domain/i-settings';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private itemKey = 'settings';
    private _settings: ISettings;

    constructor() {
        const result = window.localStorage.getItem(this.itemKey);

        if (result) {
            this._settings = JSON.parse(result);
        } else {
            this._settings = {};
        }
    }

    get settings(): ISettings {
        return this._settings;
    }

    set settings(value: ISettings) {
        const merged = {...this.settings, ...value};

        this._settings = merged;
        window.localStorage.setItem(this.itemKey, JSON.stringify(merged));
    }

    get timerDuration(): number { 
        return this.settings.timerDuration ?? 2000;
    }

    public lookup(operation: Operation): Difficulty {
        if (this.settings.difficulty) {
            return this.settings.difficulty[operation] ?? Difficulty.One;
        }
        
        return Difficulty.One;
    }

    public set(operation: Operation, difficulty: Difficulty) {
        if (!this.settings.difficulty) {
            this.settings.difficulty = {};
        }

        this.settings.difficulty[operation] = difficulty;
    }

}
