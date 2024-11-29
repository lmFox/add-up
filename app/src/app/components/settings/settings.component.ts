import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Difficulty } from 'domain/difficulty';
import { Operation, operations } from 'domain/operation';
import { SettingsService } from 'services/settings.service';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [FormsModule, RouterModule],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss'
})
export class SettingsComponent {
    readonly Difficulty = Difficulty;
    readonly combinations: { operation: Operation, difficulty: Difficulty}[];
    timerDuration: number;

    constructor(private readonly settingsService: SettingsService) {
        this.combinations = operations.map(op => {
            return { operation: op, difficulty: this.settingsService.lookup(op) };
        });
        this.timerDuration = this.settingsService.timerDuration;
    }

    apply() {
        this.combinations.forEach(combi => {
            this.settingsService.set(combi.operation, combi.difficulty);
        });
        this.settingsService.settings = { timerDuration: this.timerDuration };
    }
}
