import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseComponent, EShowExercise, TVisibility } from './exercise.component';
import { Exercise } from 'domain/exercise';
import { Operation } from 'domain/operation';

describe('ExerciseComponent', () => {
    let component: ExerciseComponent;
    let fixture: ComponentFixture<ExerciseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ExerciseComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(ExerciseComponent);
        component = fixture.componentInstance;
    });

    it('should show exercises correctly', () => {
        type TCases = {
            show: EShowExercise,
            exercise: TVisibility,
            answer: TVisibility
        };

        const cases: TCases[] = [
            { show: EShowExercise.Exercise, exercise: 'visible', answer: 'hidden' },
            { show: EShowExercise.Answer, exercise: 'visible', answer: 'visible' },
            { show: EShowExercise.None, exercise: 'hidden', answer: 'hidden' }
        ];

        component.exercise = new Exercise(Operation.Addition, 1, 2); 
        cases.forEach(c => {
            component.show = c.show;

            fixture.detectChanges();

            expect(component.visibilityExercise).toEqual(c.exercise);
            expect(component.visibilityAnswer).toEqual(c.answer);
        });
    });
});
