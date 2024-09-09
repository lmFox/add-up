import { Injectable } from '@angular/core';
import { Exercise } from 'domain/exercise';
import { AdditionGenerator, DivisionGenerator, ExerciseGenerator, MultiplicationGenerator, SubtractionGenerator } from 'domain/generators';
import { Random } from 'util/random';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {
    private static readonly NUM_EXERCISES = 30;
    
    private readonly generators: ExerciseGenerator[] = [
        new AdditionGenerator(),
        new SubtractionGenerator(),
        new MultiplicationGenerator(),
        new DivisionGenerator()
    ];

    constructor(private readonly settingsService: SettingsService) {}

    generate(): Exercise[] {
        const res = [];

        for (let i = 0; i < ExerciseService.NUM_EXERCISES; i++) {
            res.push(this.getRandomWarmupExercise());
        }

        for (let i = 0; i < ExerciseService.NUM_EXERCISES; i++) {
            res.push(this.getRandomExercise());
        }
        
        return res;
    }

    private getRandomWarmupExercise(): Exercise {
        const generator = Random.choice(this.generators);
        return generator.warmup();
    }

    private getRandomExercise(): Exercise {
        const generator = Random.choice(this.generators);
        const difficulty = this.settingsService.lookup(generator.operation);

        return generator.random(difficulty);
    }
}
