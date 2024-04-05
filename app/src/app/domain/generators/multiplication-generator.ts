import { Operation } from "domain/operation";
import { BaseGenerator } from "./base-generator";

export class MultiplicationGenerator extends BaseGenerator {
    protected override get operation(): Operation {
        return Operation.Multiplication;
    }
}