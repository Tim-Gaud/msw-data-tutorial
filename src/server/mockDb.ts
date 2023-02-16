// mock your data here

import { faker } from "@faker-js/faker";
import { factory, primaryKey } from "@mswjs/data";

const modelDictionary = {
  reminder: {
    id: primaryKey(faker.datatype.uuid),
    text: () => faker.random.words(3),
  },
};

export const db = factory(modelDictionary);
