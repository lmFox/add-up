import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Difficulty } from 'domain/difficulty';
import { Operation, operations } from 'domain/operation';
import { SettingsService } from 'services/difficulty.service';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss'
})
export class SettingsComponent {
    readonly Difficulty = Difficulty;
    readonly combinations: { operation: Operation, difficulty: Difficulty}[];
    timerDuration: number;

    @Output()
    settingsChange = new EventEmitter<void>();

    constructor(private readonly difficultyService: SettingsService) {
        this.combinations = operations.map(op => {
            return { operation: op, difficulty: this.difficultyService.lookup(op) };
        });
        this.timerDuration = this.difficultyService.timerDuration;
    }

    apply() {
        this.combinations.forEach(combi => {
            this.difficultyService.set(combi.operation, combi.difficulty);
        });
        this.difficultyService.settings = { timerDuration: this.timerDuration };

        this.settingsChange.emit();
    }
}
