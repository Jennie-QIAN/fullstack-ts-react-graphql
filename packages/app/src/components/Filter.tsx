import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { gql, useQuery } from "@apollo/client";
import { FilterDropdown, FilterLegend, ShowFilterButton } from "../styledComponents";

export type Country = string | undefined;
export type Countries = Array<Country>;

const countriesQuery = gql`
  query Countries {
    countries
  }
`;

interface Props {
  showFilter: boolean;
  setShowFilter: Dispatch<SetStateAction<boolean>>;
  countryFilter: Countries;
  setCountryFilter: Dispatch<SetStateAction<Countries>>;
}

const Filter: React.FC<Props> = ({
  showFilter,
  setShowFilter,
  countryFilter,
  setCountryFilter,
}: Props) => {
  const { loading, error, data } = useQuery(countriesQuery);

  const toggleShowFilters = () => setShowFilter((currentShowFilters) => !currentShowFilters);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCountryFilter((prev) => {
      return event.target.checked
        ? [...prev, event.target.id]
        : prev.filter(country => country !== event.target.id)
    }
    )
  }

  return (
    <>
      <ShowFilterButton showFilter={showFilter} onClick={toggleShowFilters}>
        Filter
      </ShowFilterButton>
      {
        !loading && !error && showFilter && (
          <FilterDropdown>
            <FilterLegend>Select countries:</FilterLegend>
            {data.countries.map((country: Country) => {
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
          </FilterDropdown>
        )
      }
    </>
  )
}

export default Filter;
