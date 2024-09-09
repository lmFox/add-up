import { Component, Input } from '@angular/core';
import { Exercise } from 'domain/exercise';

export enum EShowExercise {
    Exercise,
    Answer,
    None
}

export type TVisibility = 'visible' | 'hidden';

@Component({
    selector: 'app-exercise',
    standalone: true,
    imports: [],
    templateUrl: './exercise.component.html',
    styleUrl: './exercise.component.scss'
})
export class ExerciseComponent {

    @Input({ required: true })
    exercise!: Exercise;

    @Input({ required: true })
    show!: EShowExercise;

    get visibilityExercise(): TVisibility { 
        const visibility = this.show === EShowExercise.Exercise || this.show === EShowExercise.Answer;

        return visibility ? 'visible' : 'hidden';
    }

    get visibilityAnswer(): TVisibility {
        return this.show === EShowExercise.Answer ? 'visible' : 'hidden';
    }

}
