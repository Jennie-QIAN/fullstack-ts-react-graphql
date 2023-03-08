import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";

import ClinicalTrials, { SortDirection } from "./components/ClinicalTrials";
import Filter, { Countries } from "./components/Filter"
import { Content, Layout } from "./styledComponents";

const clinicalTrialsQuery = gql`
  query ClinicalTrials($countryFilter: [String], $countrySortDirection: String, $patientsSortDirection: String) {
    clinicalTrials(countryFilter: $countryFilter, countrySortDirection: $countrySortDirection, patientsSortDirection: $patientsSortDirection) {
      site
      country
      city
      patients
    }
  }
`;

const App: React.FC = () => {
  const [countryFilter, setCountryFilter] = useState<Countries>([])
  const [countrySortDirection, setCountrySortDirection] = useState<SortDirection>(null)
  const [patientsSortDirection, setPatientsSortDirection] =
    useState<SortDirection>(null);
  const [showFilter, setShowFilter] = useState(false)

  const { loading, error, data } = useQuery(clinicalTrialsQuery, {
    variables: { countryFilter, countrySortDirection, patientsSortDirection },
  });

  if (loading) return (
    <>Loading clinical trials...</>
  )
  if (error) return (
    <>Oops, something went wrong: {error.message}</>
  )

  return (
    <Layout>
      <Content>
        <Filter
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          countryFilter={countryFilter}
          setCountryFilter={setCountryFilter}
        />
        <ClinicalTrials
          countrySortDirection={countrySortDirection}
          setCountrySortDirection={setCountrySortDirection}
          patientsSortDirection={patientsSortDirection}
          setPatientsSortDirection={setPatientsSortDirection}
          clinicalTrials={data.clinicalTrials}
        />
      </Content>
    </Layout>
  );
};

export default App;
