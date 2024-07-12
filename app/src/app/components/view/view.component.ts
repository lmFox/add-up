import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ExerciseService } from 'services/exercise.service';
import { Exercise } from 'domain/exercise';
import { SettingsComponent } from 'components/settings/settings.component';

@Component({
    selector: 'app-view',
    standalone: true,
    imports: [CommonModule, SettingsComponent],
    templateUrl: './view.component.html',
    styleUrl: './view.component.scss'
})
export class ViewComponent {
    exercises: Exercise[];
    
    index: number;
    showAnswer = false;
    showSettings = false;

    get current(): Exercise | undefined {
        return this.exercises.at(this.index);
    }
    
    get showEndScreen(): boolean {
        return !this.current;
    }

    get progress(): string {
        return `${this.index} / ${this.exercises.length}`;
    }

    constructor(private readonly exerciseService: ExerciseService) {
        this.index = 0;
        this.exercises = this.exerciseService.generate();
    }

    regenerate() {
        this.index = 0;
        this.exercises = this.exerciseService.generate();

        this.showSettings = false;
    }

    next() {
        this.toggleShowAnswer();

        // Answer has been seen previously.
        if (!this.showAnswer) {
            this.proceedNextExercise();
        }
    }

    private toggleShowAnswer() {
        this.showAnswer = !this.showAnswer;
    }

    private proceedNextExercise() {
        this.index += 1;
    }

    toggleShowSettings() {
        this.showSettings = !this.showSettings;
    }
}
