import styled from 'styled-components';

import UI from '../../constants/UI';
import Colors from '../../constants/Colors';

interface CellContentProps {
  isClickDisabled?: boolean;
}

export const ReportItemContainer = styled.table`
  width: 100%;
  /* border-collapse: collapse; */
  border-collapse: separate;
  border-spacing: 0;
  margin: 35px 0;
  border-radius: 10px;

  tr:hover td:not([rowspan]) {
    background-color: #ddd;
  }
  tr:hover td[rowspan] {
    background: none;
  }
  thead {
    font-family: 'Open Sans Condensed', sans-serif;
  }
  th,
  td {
    border: 1px solid #aaa;
  }
  th {
    padding: 8px;
  }
  td {
    padding: 8px 16px;
  }
  tr:last-child td:first-child {
    border-bottom-left-radius: 10px;
  }
  /* tr:last-child td:last-child {
    border-bottom-right-radius: 10px;
  } */
  tbody tr:first-child td:last-child {
    border-bottom-right-radius: 10px;
  }
`;

export const ItemRootHeader = styled.th`
  font-size: 26px;
  background-color: ${Colors.primary};
  color: white;
  border-top-left-radius: ${UI.default_borderRadius};
  border-top-right-radius: ${UI.default_borderRadius};
`;

export const ItemHeading = styled.th`
  background-color: #ccc;
  font-size: 22px;
  font-weight: bolder;
`;

export const ItemSubheading = styled.td`
  font-weight: bold;
`;

export const ItemParagraph = styled.div`
  display: flex;
  align-items: center;
`;

export const EditDeleteCell = styled.td`
  text-align: center;
`;

export const EditCellContent = styled.div<CellContentProps>`
  background-color: white;
  border: 1px solid black;
  padding: 5px 0;
  border-radius: 5px;
  pointer-events: ${props => (props.isClickDisabled ? 'none' : 'auto')};

  :hover {
    cursor: pointer;
    background-color: black;
    color: white;
  }
`;

export const DeleteCellContent = styled.div<CellContentProps>`
  background-color: #ff0e0e;
  color: white;
  padding: 10px;
  border-radius: 5px;
  pointer-events: ${props => (props.isClickDisabled ? 'none' : 'auto')};

  :hover {
    cursor: pointer;
    background-color: #ee0e0e;
  }
`;
