import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Difficulty } from 'domain/difficulty';
import { Operation, operations } from 'domain/operation';
import { DifficultyService } from 'services/difficulty.service';

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

    @Output()
    settingsChange = new EventEmitter<void>();

    constructor(private readonly difficultyService: DifficultyService) {
        this.combinations = operations.map(op => {
            return { operation: op, difficulty: this.difficultyService.lookup(op) };
        });
    }

    apply() {
        this.combinations.forEach(combi => {
            this.difficultyService.set(combi.operation, combi.difficulty);
        });

        this.settingsChange.emit();
    }
}
