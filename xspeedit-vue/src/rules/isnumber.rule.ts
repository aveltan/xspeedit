import {IRule } from "./rule";

/**
 * Verifies that a string contains only numbers
 */
export class IsNumberRule implements IRule {
    public validate(str: string): void {
        if (isNaN(Number(str)))
            throw new Error("Input string is not a number.");
    }

}
