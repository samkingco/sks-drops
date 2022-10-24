import dropOneMetadata from "@sks-drops/tokens/drop-1/metadata.json";
import dropTwoMetadata from "@sks-drops/tokens/drop-2/metadata.json";

interface Attribute {
  trait_type: string;
  value: any;
}

export interface Drop {
  id: number;
  name: string;
  description: string;
  attributes?: Attribute[];
  startsAt?: number;
  endsAt?: number;
}

export const DROP_1 = {
  id: 1,
  ...dropOneMetadata,
} as const;

export const DROP_2 = {
  id: 2,
  startsAt: 1666566000, // 24/10/2022
  endsAt: 1667174400, // 31/10/2022
  ...dropTwoMetadata,
} as const;

export const allDrops: Drop[] = [DROP_1, DROP_2];