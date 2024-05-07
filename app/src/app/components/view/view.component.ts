import { Component } from '@angular/core';
import { ExerciseService } from 'services/exercise.service';
import { Exercise } from 'domain/exercise';

@Component({
    selector: 'app-view',
    standalone: true,
    imports: [],
    templateUrl: './view.component.html',
    styleUrl: './view.component.scss'
})
export class ViewComponent {
    readonly exercises: Exercise[];
    
    index: number;
    showAnswer = false;

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
}
