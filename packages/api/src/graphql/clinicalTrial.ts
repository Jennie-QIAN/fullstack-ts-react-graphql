import { stringArg, extendType, nullable, objectType, list } from "nexus";
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
        countrySortDirection: nullable(stringArg()),
        patientsSortDirection: nullable(stringArg()),
        countryFilter: nullable(list(stringArg())),
      },
      resolve(_, { countryFilter, countrySortDirection, patientsSortDirection }) {
        let filteredTrials = [...trials];
        if (countryFilter && countryFilter.length > 0) {
          filteredTrials = trials.filter(trial => countryFilter.includes(trial.country))
        }
        const result = filteredTrials.sort((a, b) => {
          const countrySort = countrySortDirection === "asc" ? (a.country.localeCompare(b.country)) : countrySortDirection === "desc" ? (b.country.localeCompare(a.country)) : 0
          const patientSort = patientsSortDirection === "asc" ? (a.patients - b.patients) : patientsSortDirection === "desc" ? (b.patients - a.patients) : 0
          return countrySort || patientSort
        })
        return result;
      },
    });

    t.nonNull.list.field("countries", {
      type: "String",
      resolve() {
        return [...new Set(trials.map((trial) => trial.country))]
      }
    })
  },
});