import styled from "styled-components";

export const Layout = styled.div`
  background: #f6f7fa;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

export const Content = styled.div`
  margin-top: 48px;
  max-width: 1300px;
  width: 100%;
`;

export const FilterDropdown = styled.div`
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

export const FilterLegend = styled.legend`
  color: #20A075;
  font-weight: 500;
  margin-bottom: 0.5em
`

interface ShowFilterBtnProps {
  readonly showFilter: boolean;
}

export const ShowFilterButton = styled.button<ShowFilterBtnProps>`
  background-color: ${(props) => (props.showFilter ? "#20A075" : "white")};
  border: 1px solid #20A075;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;  
  padding: 1em 2em;
`

export const Table = styled.div`
  border-collapse: separate;
  border-spacing: 0px 8px;
  display: table;
`;

export const Header = styled.div`
  display: table-header-group;
`;

export const Body = styled.div`
  display: table-row-group;
`;

export const Row = styled.div`
  display: table-row;
`;

export const HeaderCell = styled.div`
  display: table-cell;
  padding: 8px 32px;
  border-radius: 4px;
`;

export const Cell = styled.div`
  --border-color: #eaedf1;
  display: table-cell;
  vertical-align: middle;
  padding: 16px 32px;
  background: #ffffff;
  border-width: 1px;
  border-style: solid none;
  border-color: var(--border-color);
  &:first-child {
    border-left: 1px solid var(--border-color);
    border-radius: 4px 0 0 4px;
  }
  &:last-child {
    border-right: 1px solid var(--border-color);
    border-radius: 0 4px 4px 0;
  }
`;

export const Button = styled.div`
  background-color: transparent;
  border: 1px solid #20A075;
  border-radius: 4px;
  color: #20A075;
  cursor: pointer;
  display: inline-flex;
  margin-left: 8px;
  padding: 2px;

  &:hover {
    background-color: #20A075;
    color: white;
  }
`