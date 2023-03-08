import { extendType } from "nexus";
import { data } from "./data";

export const CountryQuery = extendType({
  type: "Query",

  definition(t) {
    t.nonNull.list.field("countries", {
      type: "String",
      resolve() {
        return [...new Set(data.map((trial) => trial.country))]
      }
    })
  },
});