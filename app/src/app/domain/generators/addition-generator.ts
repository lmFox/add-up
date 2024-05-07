import { Operation } from "domain/operation";
import { BaseGenerator } from "./base-generator";

export class AdditionGenerator extends BaseGenerator {
    override get operation(): Operation {
        return Operation.Addition;
    }
}