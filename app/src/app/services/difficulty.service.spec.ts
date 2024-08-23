import { TestBed } from '@angular/core/testing';

import { SettingsService } from './difficulty.service';
import { Difficulty } from 'domain/difficulty';
import { Operation } from 'domain/operation';

describe('DifficultyService', () => {
    let service: SettingsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SettingsService);
    });

    it('should lookup difficulties from local storage', () => {
        const expectedDifficulty = Difficulty.Max;
        const localStorageSpy = spyOn(window.localStorage, 'getItem')
                                    .and.returnValue(expectedDifficulty.toString());

        expect(service.lookup(Operation.Addition)).toBe(expectedDifficulty);
        expect(localStorageSpy).toHaveBeenCalled();
    });

    it('should return lowest difficulty when not found in local storage', () => {
        spyOn(window.localStorage, 'getItem').and.returnValue(null);

        expect(service.lookup(Operation.Addition)).toBe(Difficulty.One);
    });

    it('should return lowest difficulty when incorrect value found in local storage', () => {
        const dirty = ['-1', (Difficulty.Max + 1).toString(), 'asdf'];

        spyOn(window.localStorage, 'getItem').and.returnValues(...dirty);

        dirty.forEach(() => {
            expect(service.lookup(Operation.Addition)).toBe(Difficulty.One);
        });
    });

    it('should write difficulty to local storage', () => {
        const localStorageSpy = spyOn(window.localStorage, 'setItem').and.stub();
        service.set(Operation.Addition, Difficulty.Max);

        expect(localStorageSpy).toHaveBeenCalledOnceWith(Operation.Addition, Difficulty.Max.toString());
    });
});
