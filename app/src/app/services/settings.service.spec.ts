import { TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';
import { Difficulty } from 'domain/difficulty';
import { Operation } from 'domain/operation';
import { ISettings } from 'domain/i-settings';

describe('DifficultyService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('should read and write settings to and from local storage', () => {
        const mockSettings: ISettings = {
            difficulty: { [Operation.Addition]: Difficulty.Two },
            timerDuration: SettingsService.MIN_TIMER_DURATION
        };
        const getItemSpy = spyOn(window.localStorage, 'getItem').and.returnValue(JSON.stringify(mockSettings));
        const setItemSpy = spyOn(window.localStorage, 'setItem').and.stub();

        const service = TestBed.inject(SettingsService);
        expect(service.settings).toEqual(mockSettings);
        expect(getItemSpy).toHaveBeenCalledOnceWith(SettingsService.ITEM_KEY);

        mockSettings.difficulty = {};

        service.settings = mockSettings;

        expect(service.settings).toEqual(mockSettings);
        expect(setItemSpy).toHaveBeenCalledOnceWith(SettingsService.ITEM_KEY, JSON.stringify(mockSettings));
    });

    describe('lookup settings', () => {
        let service: SettingsService;
        let mockSettings: ISettings;
        let settingsSpy: jasmine.Spy;
        
        beforeEach(() => {
            service = TestBed.inject(SettingsService);

            mockSettings = {};
            settingsSpy = spyOnProperty(service, 'settings').and.returnValue(mockSettings);
        });
        
        it('should return difficulty when found', () => {
            const expectedDifficulty = Difficulty.Max;
            mockSettings.difficulty = { [Operation.Addition]: expectedDifficulty };

            expect(service.lookup(Operation.Addition)).toEqual(expectedDifficulty);
        });

        it('should return lowest difficulty when not found', () => {
            expect(service.lookup(Operation.Addition)).toEqual(Difficulty.One);
        });

        it('should return timer duration when found', () => {
            const expectedDuration = 4000;
            mockSettings.timerDuration = expectedDuration;

            expect(service.timerDuration).toEqual(expectedDuration);
        });

        it('should return minimal timer duration when not found', () => {
            expect(service.timerDuration).toEqual(SettingsService.MIN_TIMER_DURATION);
        });
    });
});
