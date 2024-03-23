import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExerciseService } from './services/exercise.service';
import { Difficulty, Exercise } from './services/exercise';

enum ViewState {
    Exercise,
    Answer
}

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    readonly exercises: Exercise[];

    index: number;
    current?: Exercise;
    showAnswer = false;
    
    get showEndScreen(): boolean {
        return !this.current;
    }

    get progress(): string {
        return `${this.index} / ${this.exercises.length}`;
    }

    constructor(private readonly exerciseService: ExerciseService) {
        this.index = 0;
        this.exercises = this.exerciseService.generate(Difficulty.One);
        this.current = this.exercises.at(this.index);
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
        this.current = this.exercises.at(this.index);
    }
}
