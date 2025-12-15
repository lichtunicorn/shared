import type { z } from "zod";
import type { noGetCommand as noGetCommandSchema, directReference, subReference } from "public/modules/command/schema";

import { validateReferenceDataStructure } from "./reference";

// const command: z.infer<typeof noGetCommandSchema> = {
//     operation: 'set',
//     source: {
//         type: 'reference',
//         reference: 'section',
//         id: 'abc'
//     },
//     subSources: [
//         {
//             type: 'key',
//             key: 'index',
//         }
//     ],
//     value: {
//         type: 'value',
//         value: null
//     },
//     options: {}
// };

// const result = validateDataStructure(command);

const directSource: z.infer<typeof directReference> = {
    type: 'reference',
    reference: 'show',
    id: 'abc'
};

const subSources: z.infer<typeof subReference>[] = [
    {
        type: 'key',
        key: 'sections',
    },
    {
        type: 'getUniqueFromArray',
        key: 'index',
        value: {
            type: 'value',
            value: null
        }
    },
];

const result = validateReferenceDataStructure(directSource, subSources);
console.log(result);
