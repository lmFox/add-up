import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ViewComponent } from './view.component';
import { EShowExercise } from 'components/exercise/exercise.component';
import { SettingsService } from 'services/settings.service';
import { provideRouter } from '@angular/router';

describe('ViewComponent', () => {
    let component: ViewComponent;
    let fixture: ComponentFixture<ViewComponent>;
    let settingsService: SettingsService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ViewComponent],
            providers: [provideRouter([]), SettingsService]
        })
        .compileComponents();

        fixture = TestBed.createComponent(ViewComponent);
        component = fixture.componentInstance;

        settingsService = TestBed.inject(SettingsService);
    });

    it('should generate exercises', () => {
        fixture.detectChanges();
        expect(component.current).toBeDefined();
        expect(component.progress.index).toBe(0);
        expect(component.progress.max).toBeGreaterThan(0);
        expect(component.show).toBe(EShowExercise.Exercise);
    });

    it('should show answer after first next and proceed to next exercise on second next', () => {
        fixture.detectChanges();
        const current = component.current;

        component.next();

        expect(component.show).toBe(EShowExercise.Answer);
        expect(component.current).toEqual(current);

        component.next();

        expect(component.show).toBe(EShowExercise.Exercise);
        expect(component.current).not.toEqual(current);
    });

    it('should show end screen after all exercises', () => {
        fixture.detectChanges();
        for (let index = component.progress.index; index < component.progress.max; index += 1) {
            expect(component.showEndScreen).toBeFalse();
            expect(component.current).toBeDefined();
            component.next();
            component.next();
        }

        expect(component.showEndScreen).toBeTrue();
    });

    it('should hide exercises after timer expires', fakeAsync(() => {
        fixture.detectChanges();
        expect(component.show).toBe(EShowExercise.Exercise);

        tick(settingsService.timerDuration);
        fixture.detectChanges();
        
        expect(component.show).toBe(EShowExercise.None);
    }));

});
