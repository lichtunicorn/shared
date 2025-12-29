import { noGetCommand as noGetCommandSchema } from "public/modules/command/schema";

export function validateSyntax(command: unknown): boolean {
    try {
        noGetCommandSchema.parse(command);
        return true;
    } catch {
        return false;
    }
}