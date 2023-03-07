import React from "react";
import { SortDirection } from "../ClinicalTrials";
import { Button } from "../components";

interface Props {
  sortDirection: SortDirection;
  onClick: () => void;
}

const SortButton: React.FC<Props> = ({
  sortDirection,
  onClick
}: Props) => {
  return (
    <Button onClick={onClick}>
      {sortDirection ? sortDirection === "asc" ? "↑" : "↓" : "↑↓"}
    </Button>
  )
}

export default SortButton;
