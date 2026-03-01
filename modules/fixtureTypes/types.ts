import type { z } from 'zod';
import type { infoSchema } from './schema';

export type fixtureInfoType = z.infer<typeof infoSchema>;

export type publicFixtureType = fixtureInfoType & { name: string };