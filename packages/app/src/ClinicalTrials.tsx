import React, { Fragment, useCallback } from "react";
import {
  Table,
  Header,
  HeaderCell,
  ClickableHeaderCell,
  Body,
  Row,
  Cell,
} from "./components";

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
          <ClickableHeaderCell onClick={toggleCountrySortDirection}>
            country {sortDirectionIndicator(countrySortDirection)}
          </ClickableHeaderCell>
          <HeaderCell>city</HeaderCell>
          <ClickableHeaderCell onClick={togglePatientsSortDirection}>
            patients {sortDirectionIndicator(patientsSortDirection)}
          </ClickableHeaderCell>
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
