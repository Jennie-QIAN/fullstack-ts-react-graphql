import { stringArg, extendType, nullable, objectType } from "nexus";
import { data } from "./data";

export const ClinicalTrial = objectType({
  name: "ClinicalTrial",
  definition(t) {
    t.string("site");
    t.string("country");
    t.string("city");
    t.int("patients");
  },
});

const capitalizeString = (str: String) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const trials = data.map(trial => {
  return {
    ...trial,
    city: capitalizeString(trial.city)
  }
})

export const ClinicalTrialQuery = extendType({
  type: "Query",

  definition(t) {
    t.nonNull.list.field("clinicalTrials", {
      type: "ClinicalTrial",
      args: {
        patientsSortDirection: nullable(stringArg()),
      },
      resolve(_, { patientsSortDirection }) {
        if (patientsSortDirection === "asc") {
          return trials.sort((a, b) => b.patients - a.patients);
        }
        if (patientsSortDirection === "desc") {
          return trials.sort((a, b) => a.patients - b.patients);
        }
        return trials;
      },
    });
  },
});
