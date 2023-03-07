import { gql, useQuery } from "@apollo/client";
import React, { ChangeEvent, useState } from "react";

import ClinicalTrials, { SortDirection } from "./ClinicalTrials";
import { Content, Filter, FilterLegend, Layout, ShowFilterButton } from "./components";

const clinicalTrialsQuery = gql`
  query ClinicalTrials($countryFilter: [String], $countrySortDirection: String, $patientsSortDirection: String) {
    clinicalTrials(countryFilter: $countryFilter, countrySortDirection: $countrySortDirection, patientsSortDirection: $patientsSortDirection) {
      site
      country
      city
      patients
    }
    countries
  }
`;

export type CountryFilter = Array<string | undefined>;

const App: React.FC = () => {
  const [countryFilter, setCountryFilter] = useState<CountryFilter>([])
  const [countrySortDirection, setCountrySortDirection] = useState<SortDirection>(null)
  const [patientsSortDirection, setPatientsSortDirection] =
    useState<SortDirection>(null);
  const [showFilters, setShowFilters] = useState(false)

  const { loading, error, data } = useQuery(clinicalTrialsQuery, {
    variables: { countryFilter, countrySortDirection, patientsSortDirection },
  });

  const toggleShowFilters = () => setShowFilters((currentShowFilters) => !currentShowFilters);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCountryFilter((prev) => {
      return event.target.checked
        ? [...prev, event.target.id]
        : prev.filter(country => country !== event.target.id)
    }
    )
  }

  return (
    <Layout>
      <Content>
        <div>
          <ShowFilterButton showFilter={showFilters} onClick={toggleShowFilters}>
            Filter
          </ShowFilterButton>
          {(showFilters && !loading && !error) ? (
            <Filter>
              <FilterLegend>Select countries:</FilterLegend>
              {data.countries.map((country: string) => {
                return (
                  <div key={country}>
                    <input
                      type="checkbox"
                      id={country}
                      name="countryFilter"
                      onChange={handleFilterChange}
                      checked={countryFilter.includes(country)}
                    />
                    <label htmlFor={country}>{country}</label>
                  </div>
                )
              })}
            </Filter>
          ) : null}
        </div>
        {(!loading && !error) ? (
          <ClinicalTrials
            countrySortDirection={countrySortDirection}
            setCountrySortDirection={setCountrySortDirection}
            patientsSortDirection={patientsSortDirection}
            setPatientsSortDirection={setPatientsSortDirection}
            clinicalTrials={data.clinicalTrials}
          />
        ) : null}
      </Content>
    </Layout>
  );
};

export default App;
