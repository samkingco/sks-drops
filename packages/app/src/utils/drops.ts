import dropOneMetadata from "@sks-drops/tokens/drop-1/metadata.json";
import dropTwoMetadata from "@sks-drops/tokens/drop-2/metadata.json";
import dropThreeMetadata from "@sks-drops/tokens/drop-3/metadata.json";
import dropFourMetadata from "@sks-drops/tokens/drop-4/metadata.json";
import dropFiveMetadata from "@sks-drops/tokens/drop-5/metadata.json";
import dropSixMetadata from "@sks-drops/tokens/drop-6/metadata.json";

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
  webImageWidth: number;
  webImageHeight: number;
}

const webImageSquare = {
  webImageWidth: 2048,
  webImageHeight: 2048,
};

const webImageFourByFive = {
  webImageWidth: 2048,
  webImageHeight: 2560,
};

export const DROP_1 = {
  id: 1,
  ...dropOneMetadata,
  ...webImageSquare,
} as const;

export const DROP_2 = {
  id: 2,
  startsAt: 1666566000, // 24/10/2022
  endsAt: 1667174400, // 31/10/2022
  ...dropTwoMetadata,
  ...webImageSquare,
} as const;

export const DROP_3 = {
  id: 3,
  ...dropThreeMetadata,
  ...webImageSquare,
} as const;

export const DROP_4 = {
  id: 4,
  ...dropFourMetadata,
  ...webImageFourByFive,
} as const;

export const DROP_5 = {
  id: 5,
  startsAt: 1672358400, // 30/12/2022
  endsAt: 1673049600, // 07/01/2023
  ...dropFiveMetadata,
  ...webImageSquare,
} as const;

export const DROP_6 = {
  id: 6,
  ...dropSixMetadata,
  ...webImageSquare,
} as const;

export const allDrops: Drop[] = [
  DROP_1,
  DROP_2,
  DROP_3,
  DROP_4,
  DROP_5,
  DROP_6,
];
export const allDropsOrdered = allDrops.sort((a, b) => b.id - a.id);
export const allDropIds = allDrops.map((i) => i.id);
