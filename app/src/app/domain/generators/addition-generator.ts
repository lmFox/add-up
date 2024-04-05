import { Operation } from "domain/operation";
import { BaseGenerator } from "./base-generator";

export class AdditionGenerator extends BaseGenerator {
    protected override get operation(): Operation {
        return Operation.Addition;
    }
}