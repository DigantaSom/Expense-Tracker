import styled from 'styled-components';

import UI from '../../constants/UI';
import Colors from '../../constants/Colors';

export const ReportItemContainer = styled.table`
  /* border-collapse: collapse; */
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  margin: 35px 0;
  border-radius: 10px;

  tr:hover {
    background-color: #ddd;
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
  tr:last-child td:last-child {
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
  width: 30%;
`;

export const ItemParagraph = styled.div`
  display: flex;
  align-items: center;
`;
