import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exercise } from 'domain/exercise';
import { IProgress } from 'domain/i-progress';

@Component({
    selector: 'app-exercise',
    standalone: true,
    imports: [],
    templateUrl: './exercise.component.html',
    styleUrl: './exercise.component.scss'
})
export class ExerciseComponent {
    private _showAnswer = false;

    get showAnswer(): boolean {
        return this._showAnswer;
    }

    @Input({ required: true })
    exercise!: Exercise;

    @Input({required: true})
    progress!: IProgress;

    @Output()
    requestNext = new EventEmitter<void>();

    next() {
        this.toggleShowAnswer();

        // Answer has been seen previously, so request new one.
        if (!this.showAnswer) {
            this.requestNext.emit();
        }
    }

    private toggleShowAnswer() {
        this._showAnswer = !this._showAnswer;
    }
}
