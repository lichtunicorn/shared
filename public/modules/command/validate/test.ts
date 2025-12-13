import type { z } from "zod";
import type { noGetCommand } from "../schema";

import { inspect } from "node:util";

import { validateDataStructure } from "./dataStructure";

const command: z.infer<typeof noGetCommand> = {
    operation: 'set',
    source: {
        type: 'reference',
        reference: 'master',
        id: '12345'
    },
    subSources: [
        {
            type: 'key',
            key: 'cuelist'
        }
    ],
    value: {
        type: 'getCommand',
        command: {
            operation: 'get',
            source: {
                type: 'reference',
                reference: 'customButton',
                id: '12345'
            },
            subSources: [
                {
                    type: 'key',
                    key: 'cuelist'
                }
            ],
            options: {}
        }
    },
    options: {}
};

const result = validateDataStructure(command);

console.log(inspect(result, { depth: null, colors: true }));