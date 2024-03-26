import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComponent } from './view.component';

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
        expect(component.exercises.length).toBeGreaterThan(0);
    });

    it('should progress through the exercises', () => {
        component.exercises.forEach(exercise => {
            expect(component.current).toEqual(exercise);
            expect(component.showAnswer).toBeFalse();
            component.next();

            expect(component.current).toEqual(exercise);            
            expect(component.showAnswer).toBeTrue();
            component.next();
        });

        expect(component.current).toBeUndefined();
    });

    it('should show end screen after all exercises', () => {
        component.exercises.forEach(_exercise => {
            expect(component.showEndScreen).toBeFalse();
            component.next();
            component.next();
        });

        expect(component.showEndScreen).toBeTrue();
    });
});
