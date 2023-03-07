import React, { Fragment, useCallback } from "react";
import {
  Table,
  Header,
  HeaderCell,
  Body,
  Row,
  Cell,
} from "./components";
import SortButton from "./components/SortButton"

export type SortDirection = "asc" | "desc" | null;

interface Props {
  clinicalTrials: Array<any>;
  countrySortDirection: SortDirection;
  setCountrySortDirection: (
    countrySortDirection: SortDirection
  ) => void;
  patientsSortDirection: SortDirection;
  setPatientsSortDirection: (
    patientsSortDirection: SortDirection
  ) => void;
}

const ClinicalTrials: React.FC<Props> = ({
  clinicalTrials,
  countrySortDirection,
  setCountrySortDirection,
  patientsSortDirection,
  setPatientsSortDirection,
}: Props) => {
  const toggleCountrySortDirection = useCallback(() => {
    if (countrySortDirection == null) {
      setCountrySortDirection("asc");
    } else if (countrySortDirection === "asc") {
      setCountrySortDirection("desc");
    } else {
      setCountrySortDirection(null);
    }
  }, [countrySortDirection, setCountrySortDirection]);

  const togglePatientsSortDirection = useCallback(() => {
    if (patientsSortDirection == null) {
      setPatientsSortDirection("asc");
    } else if (patientsSortDirection === "asc") {
      setPatientsSortDirection("desc");
    } else {
      setPatientsSortDirection(null);
    }
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

const sortDirectionIndicator = (
  sortDirection: SortDirection
) => {
  if (sortDirection === "asc") return "↑";
  if (sortDirection === "desc") return "↓";
  return "";
};

export default ClinicalTrials;
