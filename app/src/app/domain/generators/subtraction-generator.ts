import { Operation } from "domain/operation";
import { BaseGenerator } from "./base-generator";

export class SubtractionGenerator extends BaseGenerator {
    override get operation(): Operation {
        return Operation.Subtraction;
    }
}