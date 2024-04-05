import { Operation } from "domain/operation";
import { BaseGenerator } from "./base-generator";

export class SubtractionGenerator extends BaseGenerator {
    protected override get operation(): Operation {
        return Operation.Subtraction;
    }
}