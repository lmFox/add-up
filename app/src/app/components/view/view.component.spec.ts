import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComponent } from './view.component';
import { EShowExercise } from 'components/exercise/exercise.component';

describe('ViewComponent', () => {
    let component: ViewComponent;
    let fixture: ComponentFixture<ViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ViewComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(ViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should generate exercises', () => {
        expect(component.current).toBeDefined();
        expect(component.progress.index).toBe(0);
        expect(component.progress.max).toBeGreaterThan(0);
        expect(component.show).toBe(EShowExercise.Exercise);
    });

    it('should show answer after first next and proceed to next exercise on second next', () => {
        const current = component.current;

        component.next();

        expect(component.show).toBe(EShowExercise.Answer);
        expect(component.current).toEqual(current);

        component.next();

        expect(component.show).toBe(EShowExercise.Exercise);
        expect(component.current).not.toEqual(current);
    });

    it('should show end screen after all exercises', () => {
        for (let index = component.progress.index; index < component.progress.max; index += 1) {
            expect(component.showEndScreen).toBeFalse();
            expect(component.current).toBeDefined();
            component.next();
            component.next();
        }

        expect(component.showEndScreen).toBeTrue();
    });

});
