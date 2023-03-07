import React, { ChangeEvent, useState } from "react";
import { Button } from "../components";
import { Filter, FilterLegend, } from "../components";

export type CountryFilter = Array<string | undefined>;

interface Props {
  countryFilter: CountryFilter;
  setCountryFilter: (
    countryFilter: CountryFilter
  ) => void;
}

const data = {
  countries: ["Spain", "France"]
}

const FilterButton: React.FC<Props> = ({
  countryFilter,
  setCountryFilter,
}: Props) => {
  const [showFilter, setShowFilter] = useState(false)
  const toggleShowFilter = () => setShowFilter((currentShowFilter) => !currentShowFilter);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCountryFilter(
      event.target.checked
        ? [...countryFilter, event.target.id]
        : countryFilter.filter(country => country !== event.target.id))
  }

  return (
    <>
      <Button onClick={toggleShowFilter}>
        Filter
      </Button>
      {showFilter ? (
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
    </>
  )
}

export default FilterButton;
