import React, { Fragment, useCallback, Dispatch, SetStateAction } from "react";
import {
  Table,
  Header,
  HeaderCell,
  Body,
  Row,
  Cell,
} from "../styledComponents";
import SortButton from "./SortButton"

export type ClinicalTrial = {
  site: string;
  country: string;
  city: string;
  patients: number;
}

export type SortDirection = "asc" | "desc" | null;

interface Props {
  clinicalTrials: Array<ClinicalTrial>;
  countrySortDirection: SortDirection;
  setCountrySortDirection: Dispatch<SetStateAction<SortDirection>>;
  patientsSortDirection: SortDirection;
  setPatientsSortDirection: Dispatch<SetStateAction<SortDirection>>;
}

const ClinicalTrials: React.FC<Props> = ({
  clinicalTrials,
  countrySortDirection,
  setCountrySortDirection,
  patientsSortDirection,
  setPatientsSortDirection,
}: Props) => {

  const toggleDirection = (state: SortDirection, setState: Dispatch<SetStateAction<SortDirection>>) => {
    if (state == null) {
      setState("asc");
    } else if (state === "asc") {
      setState("desc");
    } else {
      setState(null);
    }
  };

  const toggleCountrySortDirection = useCallback(() => {
    toggleDirection(countrySortDirection, setCountrySortDirection)
  }, [countrySortDirection, setCountrySortDirection]);

  const togglePatientsSortDirection = useCallback(() => {
    toggleDirection(patientsSortDirection, setPatientsSortDirection)
  }, [patientsSortDirection, setPatientsSortDirection]);

  return (
    <Fragment>
      <h1>Clinical trials</h1>
      <Table>
        <Header>
          <HeaderCell>site</HeaderCell>
          <HeaderCell>
            <span>countries</span>
            <SortButton sortDirection={countrySortDirection} onClick={toggleCountrySortDirection} />
          </HeaderCell>
          <HeaderCell>city</HeaderCell>
          <HeaderCell>
            <span>patients</span>
            <SortButton sortDirection={patientsSortDirection} onClick={togglePatientsSortDirection} />
          </HeaderCell>
        </Header>
        <Body>
          {clinicalTrials.map((clinicalTrial) => (
            <Row key={clinicalTrial.site}>
              <Cell>{clinicalTrial.site}</Cell>
              <Cell>{clinicalTrial.country}</Cell>
              <Cell>{clinicalTrial.city}</Cell>
              <Cell>{clinicalTrial.patients}</Cell>
            </Row>
          ))}
        </Body>
      </Table>
    </Fragment>
  );
};

export default ClinicalTrials;
