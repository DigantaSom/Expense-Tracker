import { FC } from 'react';
import dayjs from 'dayjs';

import { IReportItem } from '../../redux/report/report.types';

import {
  ReportItemContainer,
  ItemRootHeader,
  ItemHeading,
  ItemSubheading,
} from './report-item.styles';

interface ReportItemProps {
  index: number;
  reportItem: IReportItem;
}

const ReportItem: FC<ReportItemProps> = ({ index, reportItem }) => {
  const { item, cost, recipient, medium, date } = reportItem;

  return (
    <ReportItemContainer>
      <thead>
        <tr>
          <ItemRootHeader colSpan={2}>Item {index}</ItemRootHeader>
        </tr>
        <tr>
          <ItemHeading>Item</ItemHeading>
          <ItemHeading>Information</ItemHeading>
        </tr>
      </thead>
      <tbody>
        <tr>
          <ItemSubheading>Name</ItemSubheading>
          <td>{item}</td>
        </tr>
        <tr>
          <ItemSubheading>Cost</ItemSubheading>
          <td>Rs. {cost}</td>
        </tr>
        <tr>
          <ItemSubheading>Recipient</ItemSubheading>
          <td>{recipient}</td>
        </tr>
        <tr>
          <ItemSubheading>Medium</ItemSubheading>
          <td>{medium}</td>
        </tr>
        <tr>
          <ItemSubheading>Date</ItemSubheading>
          <td>{dayjs(date).format('DD MMMM[, ]YYYY')}</td>
        </tr>
      </tbody>
    </ReportItemContainer>

    // <ReportItemContainer>
    //   <ItemHeading>Item {index}</ItemHeading>

    //   {/* TODO: show in a table */}

    //   <ItemParagraph>
    //     <ItemSubheading>Item:</ItemSubheading> <p>{item}</p>
    //   </ItemParagraph>
    //   {reportItem.description && (
    //     <ItemParagraph>
    //       <ItemSubheading>Description:</ItemSubheading> <p>{reportItem.description}</p>
    //     </ItemParagraph>
    //   )}
    //   <ItemParagraph>
    //     <ItemSubheading>Cost:</ItemSubheading> <p>Rs. {cost}</p>
    //   </ItemParagraph>
    //   <ItemParagraph>
    //     <ItemSubheading>Recipient:</ItemSubheading> <p>{recipient}</p>
    //   </ItemParagraph>
    //   <ItemParagraph>
    //     <ItemSubheading>Medium:</ItemSubheading> <p>{medium}</p>
    //   </ItemParagraph>
    //   <ItemParagraph>
    //     <ItemSubheading>Date:</ItemSubheading>{' '}
    //     <p>{dayjs(date).format('DD MMMM[, ]YYYY')}</p>
    //   </ItemParagraph>
    // </ReportItemContainer>
  );
};

export default ReportItem;
