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
        expect(component.current).toBeDefined();
        expect(component.progress.max).toBeGreaterThan(0);
    });

    it('should show end screen after all exercises', () => {
        for (let index = component.progress.index; index < component.progress.max; index += 1) {
            expect(component.showEndScreen).toBeFalse();
            component.proceedNextExercise();
        }

        expect(component.showEndScreen).toBeTrue();
    });
});
