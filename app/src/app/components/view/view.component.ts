import { Component, OnInit } from '@angular/core';
import { ExerciseService } from 'services/exercise.service';
import { Exercise } from 'domain/exercise';
import { SettingsComponent } from 'components/settings/settings.component';
import { ExerciseComponent, EShowExercise } from 'components/exercise/exercise.component';
import { IProgress } from 'domain/i-progress';
import { Subscription, timer } from 'rxjs';
import { SettingsService } from 'services/difficulty.service';

@Component({
    selector: 'app-view',
    standalone: true,
    imports: [ExerciseComponent, SettingsComponent],
    templateUrl: './view.component.html',
    styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit {
    private index: number = 0;
    private exercises: Exercise[] = [];
    private _show = EShowExercise.Exercise;
    private timer?: Subscription;
    showSettings = false;

    get current(): Exercise | undefined {
        return this.exercises.at(this.index);
    }

    get progress(): IProgress {
        return {
            index: this.index,
            max: this.exercises.length
        };
    }
    
    get showEndScreen(): boolean {
        return !this.current;
    }

    get show(): EShowExercise {
        return this._show;
    }

    constructor(private readonly exerciseService: ExerciseService, private readonly settingsService: SettingsService) {}

    ngOnInit(): void {
        this.generate();
    }

    generate() {
        this.index = 0;
        this.exercises = this.exerciseService.generate();
        this._show = EShowExercise.Exercise;
        this.showSettings = false;
        this.resetTimer();
    }

    next() {
        if (this.show === EShowExercise.Answer) {
            this.proceedNextExercise();
        } else {
            this._show = EShowExercise.Answer;
            this.timer?.unsubscribe();
        }
    }

    private proceedNextExercise() {
        this.index += 1;
        this._show = EShowExercise.Exercise;
        this.resetTimer();
    }

    private resetTimer() {
        this.timer?.unsubscribe();
        this.timer = timer(this.settingsService.timerDuration).subscribe(() => {
            this._show = EShowExercise.None;
        });
    }
}
