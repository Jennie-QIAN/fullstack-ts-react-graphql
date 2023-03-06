import { useQuery, gql } from "@apollo/client";
import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";

import ClinicalTrials from "./ClinicalTrials";

const Layout = styled.div`
  background: #f6f7fa;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const Content = styled.div`
  margin-top: 48px;
  max-width: 1300px;
  width: 100%;
`;

const Filter = styled.div`
  background-color: white;
  border: 1px solid #20A075;
  border-radius: 8px;
  height: 200px;
  width: 300px;
  padding: 2em;
  position: absolute;
  overflow: scroll;
  z-index: 30;
`

const FilterLegend = styled.legend`
  color: #20A075;
  font-weight: 500;
  margin-bottom: 0.5em
`
interface ShowFilterBtnProps {
  readonly showFilter: boolean;
}

const ShowFilterButton = styled.button<ShowFilterBtnProps>`
  background-color: ${(props) => (props.showFilter ? "#20A075" : "white")};
  border: 1px solid #20A075;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;  
  padding: 1em 2em;
`

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

export type SortDirection = "asc" | "desc" | null;
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
          {showFilters && !loading && !error && (
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
          )}
        </div>
        {!loading && !error && (
          <ClinicalTrials
            countrySortDirection={countrySortDirection}
            setCountrySortDirection={setCountrySortDirection}
            patientsSortDirection={patientsSortDirection}
            setPatientsSortDirection={setPatientsSortDirection}
            clinicalTrials={data.clinicalTrials}
          />
        )}
      </Content>
    </Layout>
  );
};

export default App;
