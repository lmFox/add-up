import { Injectable } from '@angular/core';
import { Difficulty } from 'domain/difficulty';
import { Operation } from 'domain/operation';
import { ISettings } from 'domain/i-settings';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private _settings: ISettings;

    static readonly ITEM_KEY = 'settings';
    static readonly MIN_TIMER_DURATION = 2000;

    constructor() {
        const result = window.localStorage.getItem(SettingsService.ITEM_KEY);

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
        window.localStorage.setItem(SettingsService.ITEM_KEY, JSON.stringify(merged));
    }

    get timerDuration(): number { 
        return this.settings.timerDuration ?? SettingsService.MIN_TIMER_DURATION;
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
