import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Difficulty } from 'domain/difficulty';
import { Operation, operations } from 'domain/operation';
import { SettingsService } from 'services/settings.service';

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

        this.settingsChange.emit();
    }
}
