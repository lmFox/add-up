import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseComponent } from './exercise.component';
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
        component.exercise = new Exercise(Operation.Addition, 1, 2);
        component.progress = { index: 0, max: 1 };
        fixture.detectChanges();
    });

    it('should show answer on first next and on second next request new exercise', () => {
        const requestNextSpy = spyOn(component.requestNext, 'emit');

        component.next();

        expect(component.showAnswer).toBeTrue();

        component.next();

        expect(requestNextSpy).toHaveBeenCalled();
        expect(component.showAnswer).toBeFalse();
    });
});
